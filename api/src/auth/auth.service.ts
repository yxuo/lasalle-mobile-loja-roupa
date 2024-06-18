import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Cliente } from 'src/cliente/cliente.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { ClienteStatusEnum } from 'src/cliente/enums/cliente-status.enum';
import { TipoCliente } from 'src/tipo-cliente/entities/tipo-cliente.entity';
import { TipoClienteEnum } from 'src/tipo-cliente/tipo-cliente.enum';
import { HttpStatusMessage } from 'src/utils/enums/http-status-message.enum';
import { LoginResponseType } from '../utils/types/auth/login-response.type';
import { Nullable } from '../utils/types/nullable.type';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterFuncionarioDto } from './dto/auth-register-funcionario.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { IncomingMessage } from 'http';
import { IRequestUser, IRequestWithUser } from 'src/utils/types/request.type';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger('AuthService', { timestamp: true });

  constructor(
    private jwtService: JwtService,
    private clienteService: ClienteService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
    expectedRoles?: TipoClienteEnum[],
  ): Promise<LoginResponseType> {
    const user = await this.clienteService.findOne({
      where: {
        email: loginDto.email,
      },
    });

    const validateExpectedRoles =
      !expectedRoles || !expectedRoles.includes(user.tipo.id);
    if (!user || (user?.tipo && !validateExpectedRoles)) {
      throw new HttpException(
        {
          error: HttpStatusMessage.UNAUTHORIZED,
          details: {
            email: 'notFound',
            expectedRoles: expectedRoles,
            role: user?.tipo,
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        {
          error: HttpStatusMessage.UNAUTHORIZED,
          details: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.jwtService.sign({
      id: user.id,
      role: user.tipo,
    });

    return { token, user };
  }

  async validateAuthRegisterLoginDto(dto: AuthRegisterFuncionarioDto) {
    const existing = await this.clienteService.findOneBy({ email: dto.email });
    if (existing) {
      throw new HttpException(
        `Cliente já existe com email ${dto.email}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async registerCliente(dto: AuthRegisterFuncionarioDto) {
    this.validateAuthRegisterLoginDto(dto);
    return await this.register(dto, TipoClienteEnum.cliente);
  }

  async registerFuncionario(
    dto: AuthRegisterFuncionarioDto,
    request?: IRequestWithUser,
  ) {
    this.validateAuthRegisterLoginDto(dto);
    const cliente = await this.clienteService.findOneByOrFail({
      id: request.user.id,
    });
    this.validateRegisterFuncionario(cliente);
    await this.register(dto, TipoClienteEnum.funcionario);
  }

  async register(
    dto: AuthRegisterFuncionarioDto,
    tipo: TipoClienteEnum,
  ): Promise<void | object> {
    // Gerar hash único
    let hash = Cliente.generateHash();
    while (await this.clienteService.findOneBy({ hash })) {
      hash = Cliente.generateHash();
    }

    const newCliente: DeepPartial<Cliente> = {
      ...dto,
      email: dto.email,
      tipo: {
        id: tipo,
      } as TipoCliente,
      status: ClienteStatusEnum.criado,
      hash,
      password: await Cliente.hashPassword(dto.password),
    };
    await this.clienteService.save(newCliente);
  }

  validateRegisterFuncionario(cliente: Cliente) {
    // Gerentes podem cadastrar funcionários
    if (cliente.tipo.id !== TipoClienteEnum.gerente) {
      throw new HttpException(
        {
          error: HttpStatusMessage.UNAUTHORIZED,
          details: {
            error: 'Apenas gerentes podem cadastrar funcionários',
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async resetPassword(hash: string, password: string): Promise<void> {
    const forgot = await this.clienteService.findOne({
      where: {
        hash,
      },
    });

    if (!forgot) {
      throw new HttpException(
        {
          error: HttpStatusMessage.UNAUTHORIZED,
          details: {
            error: 'hash not found',
            hash,
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    forgot.password = password;

    await this.clienteService.save({
      id: forgot.id,
      password: await Cliente.hashPassword(password),
    });
  }

  async me(user: IRequestUser): Promise<Nullable<Cliente>> {
    return this.clienteService.findOneByOrFail({
      id: user.id,
    });
  }

  async update(
    cliente: Cliente,
    userDto: AuthUpdateDto,
  ): Promise<Nullable<Cliente>> {
    const userProfile = await this.clienteService.findOneByOrFail({
      id: cliente.id,
    });

    if (!userProfile) {
      throw new HttpException(
        {
          details: {
            token: 'valid token but decoded user data is invalid',
            user: {
              ...(!userProfile?.id
                ? { id: cliente?.id }
                : { id: 'userNotExists' }),
              ...(!userProfile && {
                cpfCnpj: 'invalidCpfCnpj',
              }),
            },
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.clienteService.save({
      id: cliente.id,
    });

    return userProfile;
  }
}

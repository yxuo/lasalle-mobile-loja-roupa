import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Cliente } from 'src/cliente/cliente.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { ClienteStatusEnum } from 'src/cliente/enums/cliente-status.enum';
import { Role } from 'src/roles/entities/role.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { HttpStatusMessage } from 'src/utils/enums/http-status-message.enum';
import { LoginResponseType } from '../utils/types/auth/login-response.type';
import { Nullable } from '../utils/types/nullable.type';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger('AuthService', { timestamp: true });

  constructor(
    private jwtService: JwtService,
    private clienteService: ClienteService,
  ) { }

  async validateLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<LoginResponseType> {
    const user = await this.clienteService.findOne({
      where: {
        email: loginDto.email,
      },
    });
    const expectedRoles = onlyAdmin
      ? [
        RoleEnum.master,
        RoleEnum.admin,
        RoleEnum.aprovador_financeiro,
        RoleEnum.lancador_financeiro,
        RoleEnum.admin_finan,
      ]
      : [RoleEnum.user];

    if (!user || (user?.role && !expectedRoles.includes(user.role.id))) {
      throw new HttpException(
        {
          error: HttpStatusMessage.UNAUTHORIZED,
          details: {
            email: 'notFound',
            onlyAdmin: onlyAdmin,
            expectedRoles: expectedRoles,
            role: user?.role,
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
      role: user.role,
    });

    return { token, user };
  }

  async register(dto: AuthRegisterLoginDto): Promise<void | object> {
    // Gerar hash único
    let hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
    while (await this.clienteService.findOneBy({ hash })) {
      hash = crypto
        .createHash('sha256')
        .update(randomStringGenerator())
        .digest('hex');
    }

    await this.clienteService.save({
      ...dto,
      email: dto.email,
      role: {
        id: RoleEnum.user,
      } as Role,
      status: ClienteStatusEnum.criado,
      hash,
    });
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

  async me(user: Cliente): Promise<Nullable<Cliente>> {
    return this.clienteService.findOneBy({
      id: user.id,
    });
  }

  async update(user: Cliente, userDto: AuthUpdateDto): Promise<Nullable<Cliente>> {
    const userProfile = await this.clienteService.findOneBy({ id: user.id });

    if (!userProfile) {
      throw new HttpException(
        {
          details: {
            token: 'valid token but decoded user data is invalid',
            user: {
              ...(!userProfile?.id
                ? { id: user?.id }
                : { id: 'userNotExists' }),
              ...(!(userProfile) && {
                cpfCnpj: 'invalidCpfCnpj',
              }),
            },
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.clienteService.save({
      id: user.id
    });

    return userProfile;
  }
}

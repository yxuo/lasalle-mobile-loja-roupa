import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Cliente } from 'src/cliente/cliente.entity';
import { TipoClienteEnum } from 'src/tipo-cliente/tipo-cliente.enum';
import { IRequestWithUser } from 'src/utils/types/request.type';
import { LoginResponseType } from '../utils/types/auth/login-response.type';
import { Nullable } from '../utils/types/nullable.type';
import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  private logger: Logger = new Logger('AuthController', { timestamp: true });

  constructor(private readonly authService: AuthService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  public postEmailLogin(
    @Body() loginDto: AuthEmailLoginDto,
  ): Promise<LoginResponseType> {
    return this.authService.validateLogin(loginDto, false);
  }

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('admin/email/login')
  @HttpCode(HttpStatus.OK)
  public adminLogin(
    @Body() loginDTO: AuthEmailLoginDto,
  ): Promise<LoginResponseType> {
    return this.authService.validateLogin(loginDTO, true);
  }

  /**
   * Regras:
   * - Usuários não existentes podem criar a si mesmos como cliente
   * - Gerentes podem cadastrar funcionários
   * - Gerentes são cadastrados manualmente
   */
  @Post('cliente/register')
  @HttpCode(HttpStatus.OK)
  async postClienteRegister(
    @Body() createUserDto: AuthRegisterLoginDto,
  ): Promise<void | object> {
    return await this.authService.registerCliente(createUserDto);
  }

  /**
   * Regras:
   * - Usuários não existentes podem criar a si mesmos como cliente
   * - Gerentes podem cadastrar funcionários
   * - Gerentes são cadastrados manualmente
   */
  @Post('funcionario/register')
  @SerializeOptions({
    groups: ['me'],
  })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async postEmailRegister(
    @Body() createUserDto: AuthRegisterLoginDto,
  ): Promise<void | object> {
    return await this.authService.register(
      createUserDto,
      TipoClienteEnum.funcionario,
    );
  }

  @Post('reset/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
    );
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public me(@Request() request: IRequestWithUser): Promise<Nullable<Cliente>> {
    return this.authService.me(request.user);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public update(
    @Request() request,
    @Body() userDto: AuthUpdateDto,
  ): Promise<Nullable<Cliente>> {
    return this.authService.update(request.user, userDto);
  }
}

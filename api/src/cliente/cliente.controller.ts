import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Venda } from 'src/venda/venda.entity';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IRequestWithUser } from 'src/utils/types/request.type';

@ApiTags('Cliente')
@Controller({
  path: 'cliente',
  version: '1',
})
export class ClienteController {
  constructor(private readonly ClienteService: ClienteService) {}

  @Post()
  async create(@Body() dto: CreateClienteDto) {
    return this.ClienteService.save(dto);
  }

  /**
   * Para simplificar, e por hábito, o frontend irá obter todos os clientes de uma só vez.
   * Depois disso o front irá filtrar  os dados lidos.
   *
   * Quem pode visualizar:
   * - admin
   */
  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAll(): Promise<Cliente[]> {
    return this.ClienteService.findAll();
  }

  /**
   * Obter o próprio perfil
   *
   * Quem pode visualizar:
   * - o próprio usuário
   */
  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Request() request: IRequestWithUser): Promise<Cliente> {
    return await this.ClienteService.findOneBy({ id: request.user.id });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cliente> {
    return this.ClienteService.findOneByOrFail({ id });
  }
}

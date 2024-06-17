import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Venda } from 'src/venda/venda.entity';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly ClienteService: ClienteService) {}

  @Post()
  async create(@Body() dto: CreateClienteDto) {
    return this.ClienteService.save(dto);
  }

  @Get()
  async findAll(): Promise<Cliente[]> {
    return this.ClienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cliente> {
    return this.ClienteService.findOneByOrFail({ id });
  }
}

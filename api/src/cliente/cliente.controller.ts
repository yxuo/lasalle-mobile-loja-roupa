import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { Cliente } from './cliente.entity';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  @Post()
  async create(@Body() dto: CreateVendaDto) {
    return this.clienteService.save(dto);
  }

  @Get()
  async findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cliente> {
    return this.clienteService.findOne(id);
  }
}


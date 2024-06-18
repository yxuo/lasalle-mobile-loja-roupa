import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { Venda } from './venda.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Venda')
@Controller({
  path: 'venda',
  version: 'v1',
})
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Post()
  async create(@Body() dto: CreateVendaDto) {
    return this.vendaService.save(dto);
  }

  @Get()
  async findAll(): Promise<Venda[]> {
    return this.vendaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Venda> {
    return this.vendaService.findOneBy(id);
  }
}

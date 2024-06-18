import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemVendaService } from './item-venda.service';
import { CreateProdutoDto } from './dto/create-item-venda.dto';
import { ItemVenda } from './item-venda.entity';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('ItemVenda')
@Controller({
  path: 'item-venda',
  version: 'v1',
})
export class ItemVendaController {
  constructor(private readonly itemVendaService: ItemVendaService) {}

  @Post()
  async create(@Body() dto: CreateProdutoDto) {
    return this.itemVendaService.save(dto);
  }

  @Get()
  async findAll(): Promise<ItemVenda[]> {
    return this.itemVendaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ItemVenda> {
    return this.itemVendaService.findOne(id);
  }
}


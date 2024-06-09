import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { Produto } from './produto.entity';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Post()
  async create(@Body() dto: CreateProdutoDto) {
    return this.produtoService.save(dto);
  }

  @Get()
  async findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Produto> {
    return this.produtoService.findOne(id);
  }
}


import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    private produtoRepository: Repository<Produto>,
  ) { }
  async findAll() {
    return await this.produtoRepository.find();
  }

  async findOne(id: number) {
    return await this.produtoRepository.findOneBy({ id });
  }

  async save(dto: DeepPartial<Produto>) {
    return await this.produtoRepository.save(dto);
  }
}

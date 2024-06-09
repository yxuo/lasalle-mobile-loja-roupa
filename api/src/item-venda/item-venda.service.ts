import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { ItemVenda } from './item-venda.entity';

@Injectable()
export class ItemVendaService {
  constructor(
    private itemVendaRepository: Repository<ItemVenda>,
  ) { }
  async findAll() {
    return await this.itemVendaRepository.find();
  }

  async findOne(id: number) {
    return await this.itemVendaRepository.findOneBy({ id });
  }

  async save(dto: DeepPartial<ItemVenda>) {
    return await this.itemVendaRepository.save(dto);
  }
}

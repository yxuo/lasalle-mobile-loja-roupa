import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Venda } from './venda.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VendaService {
  constructor(
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,
  ) {}
  async findAll() {
    return await this.vendaRepository.find();
  }

  async findOneBy(id: number) {
    return await this.vendaRepository.findOneBy({ id });
  }

  async save(dto: DeepPartial<Venda>) {
    return await this.vendaRepository.save(dto);
  }
}

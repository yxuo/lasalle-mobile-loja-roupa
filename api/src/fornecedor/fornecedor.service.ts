import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Fornecedor } from './fornecedor.entity';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(Fornecedor)
    private fornecedorRepository: Repository<Fornecedor>,
  ) { }

  async getAll() {
    return await this.fornecedorRepository.find();
  }

  async findOne(id: number) {
    return await this.fornecedorRepository.findOneBy({ id });
  }

  async save(dto: DeepPartial<Fornecedor>) {
    return await this.fornecedorRepository.save(dto);
  }
}
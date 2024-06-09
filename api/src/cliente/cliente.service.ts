import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    private clienteRepository: Repository<Cliente>,
  ) { }
  async findAll() {
    return await this.clienteRepository.find();
  }

  async findOne(id: number) {
    return await this.clienteRepository.findOneBy({ id });
  }

  async save(dto: DeepPartial<Cliente>) {
    return await this.clienteRepository.save(dto);
  }
}

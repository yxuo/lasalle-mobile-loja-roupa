import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { WhereEntity } from 'src/utils/where-entity.type';

@Injectable()
export class ClienteService {
  constructor(private clienteRepository: Repository<Cliente>) {}
  async findAll() {
    return await this.clienteRepository.find();
  }

  async find(options: FindManyOptions<Cliente>) {
    return await this.clienteRepository.find(options);
  }

  async findOne(options: FindOneOptions<Cliente>) {
    return await this.clienteRepository.findOne(options);
  }

  async findOneBy(where: WhereEntity<Cliente>) {
    return await this.clienteRepository.findOneBy(where);
  }

  async save(dto: DeepPartial<Cliente>) {
    return await this.clienteRepository.save(dto);
  }
}

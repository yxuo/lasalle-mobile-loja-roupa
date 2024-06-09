import { Controller } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Fornecedor } from './fornecedor.entity';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';

@Controller('fornecedor')
export class FornecedorController {
  constructor(
    private fornecedorRepository: Repository<Fornecedor>,
  ) { }

  async findAll() {
    return await this.fornecedorRepository.find();
  }

  async findOne(id: number) {
    return await this.fornecedorRepository.findOneBy({ id });
  }

  async save(dto: CreateFornecedorDto) {
    return await this.fornecedorRepository.save(dto);
  }
}

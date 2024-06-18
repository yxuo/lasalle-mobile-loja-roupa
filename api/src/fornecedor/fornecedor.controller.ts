import { Controller } from '@nestjs/common';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { FornecedorService } from './fornecedor.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Fornecedor')
@Controller({
  path: 'fornecedor',
  version: 'v1',
})
export class FornecedorController {
  constructor(private fornecedorService: FornecedorService) {}

  async findAll() {
    return await this.fornecedorService.getAll();
  }

  async findOne(id: number) {
    return await this.fornecedorService.findOne(id);
  }

  async save(dto: CreateFornecedorDto) {
    return await this.fornecedorService.save(dto);
  }
}

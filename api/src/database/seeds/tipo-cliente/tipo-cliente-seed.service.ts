import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoCliente } from 'src/tipo-cliente/entities/tipo-cliente.entity';
import { TipoClienteEnum } from 'src/tipo-cliente/tipo-cliente.enum';
import { Enum } from 'src/utils/enum';
import { Repository } from 'typeorm';

@Injectable()
export class TipoClienteSeedService {
  constructor(
    @InjectRepository(TipoCliente)
    private roleRepository: Repository<TipoCliente>,
  ) {}

  async validateRun() {
    return Promise.resolve(true);
  }

  async run() {
    // Para cada role, cria se não existir
    for (const { key, value } of Enum.getItems(TipoClienteEnum)) {
      const exists = await this.roleRepository.count({
        where: {
          id: +value,
        },
      });
      if (!exists) {
        await this.roleRepository.save(
          this.roleRepository.create({
            id: +value,
            name: key,
          }),
        );
      }
    }
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Enum } from 'src/utils/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TipoClienteEnum } from '../tipo-cliente.enum';

@Entity()
export class TipoCliente extends EntityHelper {
  constructor(tipo?: TipoClienteEnum) {
    super();
    if (tipo !== undefined) {
      this.id = tipo;
      this.name = Enum.getKey(TipoClienteEnum, tipo);
    }
  }

  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_TipoCliente_id' })
  id: number;

  @Allow()
  @ApiProperty({ example: 'administrador' })
  @Column()
  name?: string;
}

import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import * as crypto from 'crypto';
import { startOfDay } from 'date-fns';
import { TipoCliente } from 'src/tipo-cliente/entities/tipo-cliente.entity';
import {
  BeforeInsert,
  Column,
  DeepPartial,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClienteStatusEnum } from './enums/cliente-status.enum';

@Entity()
export class Cliente {
  constructor(dto: DeepPartial<Cliente>) {
    if (dto) {
    }
  }
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TipoCliente, { eager: true })
  tipo: TipoCliente;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @Column()
  status: ClienteStatusEnum;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  nascimento: Date;

  @Column({ nullable: true })
  endereco: string | null;

  @DeleteDateColumn()
  dataExclusao?: Date;

  @BeforeInsert()
  beforeInsert() {
    {
      if (this.nascimento) {
        this.nascimento = startOfDay(this.nascimento);
      }
    }
  }

  public static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  public static generateHash(): string {
    let hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
    return hash;
  }
}

import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ClienteStatusEnum } from './enums/cliente-status.enum';

@Entity()
export class Cliente {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Role)
  role: Role;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  hash: string;

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

  @Column()
  tipo: string;

  @Column()
  endereco: string;

  @Column()
  ativo: boolean;

  @Column()
  dataExclusao: Date;

  public static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}

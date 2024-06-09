import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Cliente {
  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;

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
}

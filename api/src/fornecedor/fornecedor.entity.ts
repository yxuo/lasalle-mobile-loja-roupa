import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Fornecedor {
  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  preco: number;

  @Column()
  imagens: string[];

  @Column()
  sku: string;

  @Column()
  ativo: boolean;
}

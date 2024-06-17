import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fornecedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  preco: number;

  @Column()
  imagens: string;

  @Column()
  sku: string;

  @Column()
  ativo: boolean;
}

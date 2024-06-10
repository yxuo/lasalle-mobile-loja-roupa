import { Fornecedor } from 'src/fornecedor/fornecedor.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryColumn()
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

  @ManyToOne(() => Fornecedor, { eager: true })
  fornecedor: Fornecedor;
}

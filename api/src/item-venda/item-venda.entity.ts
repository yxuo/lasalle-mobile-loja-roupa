import { Produto } from 'src/produto/produto.entity';
import { Venda } from 'src/venda/venda.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ItemVenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  precoUnitario: number;

  @Column()
  quantidade: number;

  @OneToOne(() => Produto, { eager: true })
  produto: Produto;

  @ManyToOne(() => Venda, { eager: true })
  venda: Venda;
}

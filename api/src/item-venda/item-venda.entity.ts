import { Produto } from "src/produto/produto.entity";
import { Venda } from "src/venda/venda.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class ItemVenda {
  @PrimaryColumn()
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


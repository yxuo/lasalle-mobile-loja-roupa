import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Venda {
  @PrimaryColumn()
  id: number;

  @Column()
  data: Date;

  @Column()
  valorTotal: number;

  @Column()
  status: string;
}

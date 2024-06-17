import { Fornecedor } from 'src/fornecedor/fornecedor.entity';
import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  preco: number;

  @Column({ type: String })
  imagens: string[];

  @Column()
  sku: string;

  @Column()
  ativo: boolean;

  @ManyToOne(() => Fornecedor, { eager: true })
  fornecedor: Fornecedor;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  beforeInsert() {
    (this.imagens as any) = this.imagens.join(',');
  }

  @AfterLoad()
  afterLoad() {
    this.imagens = (this.imagens as unknown as string).split(',');
  }
}

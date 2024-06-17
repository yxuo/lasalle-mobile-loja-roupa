import { Venda } from '../venda.entity';

export class GetVendaDto {
  id?: number;
  data: Date;
  valorTotal: number;
  status: string;
  createdAt?: Date;
}

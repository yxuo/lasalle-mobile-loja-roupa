import { Venda } from '../venda.entity';

export class GetVendaDto implements Venda {
  id: number;
  data: Date;
  valorTotal: number;
  status: string;
}

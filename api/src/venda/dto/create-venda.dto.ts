import { Venda } from "../venda.entity";

export class CreateVendaDto extends Venda {
  data: Date;
  valorTotal: number;
  status: string;
}

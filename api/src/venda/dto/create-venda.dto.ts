import { Venda } from "../venda.entity";

export class CreateVendaDto extends Venda {
  nome: string;
  descricao: string;
  preco: number;
  imagens: string[];
  sku: string;
  ativo: boolean;
}

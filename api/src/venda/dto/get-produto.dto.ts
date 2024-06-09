import { Venda } from "../venda.entity";

export class GetProdutoDto implements Venda {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagens: string[];
  sku: string;
  ativo: boolean;
}

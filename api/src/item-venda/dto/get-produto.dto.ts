import { ItemVenda } from "../item-venda.entity";

export class GetProdutoDto implements ItemVenda {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagens: string[];
  sku: string;
  ativo: boolean;
}

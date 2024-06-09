import { Produto } from "../produto.entity";

export class GetProdutoDto implements Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagens: string[];
  sku: string;
  ativo: boolean;
}

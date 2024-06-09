import { Produto } from "../produto.entity";

export class CreateProdutoDto extends Produto {
  nome: string;
  descricao: string;
  preco: number;
  imagens: string[];
  sku: string;
  ativo: boolean;
}

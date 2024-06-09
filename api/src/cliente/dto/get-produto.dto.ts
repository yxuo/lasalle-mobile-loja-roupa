import { Cliente } from "../venda.entity";

export class GetProdutoDto implements Cliente {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagens: string[];
  sku: string;
  ativo: boolean;
}

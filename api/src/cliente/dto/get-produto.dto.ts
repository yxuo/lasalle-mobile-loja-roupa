import { Fornecedor } from 'src/fornecedor/fornecedor.entity';
import { Produto } from 'src/produto/produto.entity';

export class GetProdutoDto implements Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagens: string;
  sku: string;
  ativo: boolean;
  fornecedor: Fornecedor;
}

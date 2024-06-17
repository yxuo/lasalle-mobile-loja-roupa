import { Fornecedor } from 'src/fornecedor/fornecedor.entity';

export class GetProdutoDto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagens: string[];
  sku: string;
  ativo: boolean;
  fornecedor: Fornecedor;
}

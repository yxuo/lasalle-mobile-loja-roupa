import { ItemVenda } from '../item-venda.entity';

export class CreateProdutoDto extends ItemVenda {
  nome: string;
  descricao: string;
  preco: number;
  imagens: string;
  sku: string;
  ativo: boolean;
}

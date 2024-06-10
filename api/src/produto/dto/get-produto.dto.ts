import { Fornecedor } from 'src/fornecedor/fornecedor.entity';
import { Produto } from '../produto.entity';

export class GetProdutoDto implements Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagens: string;
  sku: string;
  ativo: boolean;
  fornecedor: Fornecedor;

  getImages() {
    return this.imagens.split(',');
  }

  setImages(imagens: string[]) {
    this.imagens = imagens.join(',');
  }

}

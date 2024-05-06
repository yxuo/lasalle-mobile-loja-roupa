import { SafeResourceUrl } from '@angular/platform-browser';

export interface Produto {
  nome: string;
  descricao: string;
  preco: number;
  imagens?: string[];
  idFornecedor: string;
  ativo: boolean;
}

export interface ProdutoObservable {
  $key: string;
  nome: string;
  descricao: string;
  preco: number;
  imagens: ProdutoImagem[];
  idFornecedor: string;
}

export interface ProdutoImagem {
  base64: string;
  tipo: 'png' | 'jpg' | 'webp';
  src: SafeResourceUrl;
}

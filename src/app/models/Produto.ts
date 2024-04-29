import { SafeResourceUrl } from '@angular/platform-browser';

export interface Produto {
  nome: string;
  descricao: string;
  preco: number;
  imagens?: string[];
  idFornecedor: string;
}

export interface ProdutoObservable {
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

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import {
  Produto,
  ProdutoObservable,
  ProdutoImagem,
} from '../../models/Produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(
    private db: AngularFireDatabase,
    private _sanitizer: DomSanitizer
  ) {}

  insert(product: Produto) {
    console.log("INSERT PROD", product)
    this.db
      .list('produto')
      .push(product)
      .then((result: any) => {
        console.log(result);
      });
  }

  update(product: Produto, key: string) {
    this.db
      .list('produto')
      .update(key, product)
      .catch((error: any) => {
        console.log(error);
      });
  }

  getAll(): Observable<ProdutoObservable[]> {
    return this.db
      .list('produto')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          const produtos = changes.map((c) => ({
            key: c.payload.key,
            ...{
              ...(c.payload.val() as Produto),
            },
          }));
          return this.getProdutoHelpers(produtos);
        })
      );
  }

  getProdutoHelpers(produtos: Produto[]): ProdutoObservable[] {
    const helpers: ProdutoObservable[] = [];
    for (const produto of produtos) {
      // Imagens
      const imagens: ProdutoImagem[] = [];
      for (const imagem of produto.imagens || []) {
        const tipo = this.getImagemTipo(imagem);
        imagens.push({
          base64: imagem,
          tipo: tipo,
          src: this._sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/${tipo};base64,` + imagem
          ),
        });
      }
      // ProdutoHelpers
      helpers.push({
        nome: produto.nome,
        descricao: produto.descricao,
        idFornecedor: produto.idFornecedor,
        preco: produto.preco,
        imagens: imagens,
      });
    }
    return helpers;
  }

  getImagemTipo(base64: string) {
    if (base64.startsWith('i')) {
      return 'png';
    }
    if (base64.startsWith('R')) {
      return 'jpg';
    }
    if (base64.startsWith('U')) {
      return 'webp';
    }
    throw new Error('invalid base64 type');
  }
}

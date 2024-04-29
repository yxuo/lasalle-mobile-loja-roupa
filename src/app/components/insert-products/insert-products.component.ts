import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Produto } from '../../models/Produto';
import { DomSanitizer } from '@angular/platform-browser';
import { FornecedorService } from '../../services/fornecedor/fornecedor.service';
import { ProdutoService } from '../../services/produto/produto.service';
import { FornecedorObs } from '../../models/Fornecedor';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insert-products',
  templateUrl: './insert-products.component.html',
  styleUrl: './insert-products.component.scss',
})
export class InsertProductsComponent {
  newProdutoSKU: string;
  newProdutoNome: string;
  newProdutoDescricao: string;
  newProdutoPreco: number;
  newProdutoIdFornecedor: string;
  newProdutoImagensFile: File[];
  newProdutoImagensBase64: string[];
  newProductForm: any;
  fornecedores: FornecedorObs[] = [];
  fornecedoresObs?: Observable<FornecedorObs[]>;

  constructor(
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.fornecedoresObs = this.getAll();
    this.fornecedorService.fornecedor$.subscribe((fornecedor) => {
      this.fornecedores = fornecedor;
    });
  }

  getAll() {
    const fornecedor = this.db
      .list('fornecedor')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            key: c.payload.key,
            ...{
              ...(c.payload.val() as FornecedorObs),
              cnpj: String(c.payload.key),
            },
          }));
        })
      );
    fornecedor.subscribe((value: any) => {
      this.fornecedores.push(...value.map((i: any) => ({ name: i.name })));
    });

    return fornecedor;
  }

  onUpdateFornecedor(event: Event) {
    // const ev = event.target as HTMLSelectElement;
    console.log(this.newProdutoIdFornecedor);
    // this.newProdutoIdFornecedor = ev.value;
  }

  addProduct() {
    console.log(this.newProdutoIdFornecedor);
    const newProduto: Produto = {
      nome: this.newProdutoNome,
      preco: this.newProdutoPreco,
      descricao: this.newProdutoDescricao,
      idFornecedor: this.newProdutoIdFornecedor,
      imagens: this.newProdutoImagensBase64,
    };
    this.produtoService.insert(newProduto);
  }

  onFileChange(event: any) {
    this.newProdutoImagensFile = event.target.files;
    this.newProdutoImagensBase64 = [];
    console.log('Upload file');
    if (this.newProdutoImagensFile) {
      for (let i = 0; i < this.newProdutoImagensFile.length; i++) {
        const file = this.newProdutoImagensFile[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            e.target.result as string
          );
          const base64String: string = Object.values(base64)[0].split(',')[1];
          this.newProdutoImagensBase64.push(base64String);
        };
        reader.readAsDataURL(file);
      }
    }
  }
}

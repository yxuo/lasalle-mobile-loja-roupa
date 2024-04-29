import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Produto,
  ProdutoObservable,
  ProdutoImagem,
} from '../../models/Produto';
import { ProdutoService } from '../../services/produto/produto.service';
import { FileUploadEvent } from 'primeng/fileupload';
import { DomSanitizer } from '@angular/platform-browser';
import { FornecedorService } from '../../services/fornecedor/fornecedor.service';
import { FornecedorObs } from '../../models/Fornecedor';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  newProdutoSKU: string;
  newProdutoNome: string;
  newProdutoDescricao: string;
  newProdutoPreco: number;
  newProdutoIdFornecedor: string;
  newProdutoImagensFile: File[];
  newProdutoImagensBase64: string[];
  newProductForm: any;
  search: string;
  searchFilter: ProdutoObservable[] | undefined;
  filtro: ProdutoObservable[] = [];
  fornecedores: FornecedorObs[] = [];

  products$: Observable<ProdutoObservable[]>;

  ngOnInit(): void {
    this.fornecedorService.fornecedor$.subscribe((fornecedores) => {
      this.fornecedores = fornecedores;
    });
    this.loadProducts();
  }

  constructor(
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient,
    private db: AngularFireDatabase
  ) {
    this.products$ = this.produtoService.getAll();
    async () => {
      // this.fornecedores = await this.fornecedorService.getAll();
    };
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

  addProduct() {
    const newProduto: Produto = {
      nome: this.newProdutoNome,
      preco: this.newProdutoPreco,
      descricao: this.newProdutoDescricao,
      idFornecedor: this.newProdutoIdFornecedor,
      imagens: this.newProdutoImagensBase64,
    };
    this.produtoService.insert(newProduto);
  }

  loadProducts() {
    this.products$ = this.produtoService.getAll();
    this.produtoService.getAll().subscribe((data) => {
      this.filtro = data;
      this.searchFilter = data;
    });
  }

  onSearchChange(search: Event) {
    const valueFilter = search.target as HTMLInputElement;
    const searchText = valueFilter.value;
    console.log(searchText);
    this.searchFilter = this.filtro.filter((data) => {
      for (const val of Object.values(data)) {
        if (
          val &&
          val
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(
              searchText
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
            )
        ) {
          return true;
        }
      }
      return false;
    });
  }
}

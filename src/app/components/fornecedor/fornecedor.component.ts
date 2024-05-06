import { Component } from '@angular/core';
import { Fornecedor, FornecedorObs } from '../../models/Fornecedor';
import { FornecedorService } from '../../services/fornecedor/fornecedor.service';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { SupplierService } from '../../services/supplier/supplier.service';

@Component({
  selector: 'app-list-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.scss',
})
export class FornecedorComponent {
  fornecedores: FornecedorObs[] = [];
  fornecedoresObs?: Observable<FornecedorObs[]>;
  isEdit: boolean = false;
  editFornecedor: FornecedorObs;
  cnpj: string;
  nome: string;

  constructor(
    private fornecedorService: FornecedorService,
    private supplierService: SupplierService,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.loadFornecedores();
  }

  ngOnInit(): void {
    this.fornecedoresObs = this.loadFornecedores();
  }

  updateFornecedor(oldFornecedor: any) {
    console.log('testeeee',oldFornecedor)
    const fornecedor: Fornecedor = {
      cnpj: this.cnpj,
      nome: this.nome,
    };
    this.fornecedorService.update(
      oldFornecedor.key,
      fornecedor
    );
    this.isEdit = false;
  }

  showEditFornecedor(fornecedor: FornecedorObs) {
    this.isEdit = true;
    this.editFornecedor = fornecedor;
    this.cnpj = this.editFornecedor.cnpj;
    this.nome = this.editFornecedor.nome;
  }

  loadFornecedores() {
    this.fornecedorService.fornecedor$.subscribe((fornecedor) => {
      this.fornecedores = fornecedor;
    });
    const fornecedor = this.db
      .list('fornecedor')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            ...{
              ...(c.payload.val() as FornecedorObs),
              key: String(c.payload.key),
            },
          }));
        })
      );
    fornecedor.subscribe((value: any) => {
      this.fornecedores.push(...value.map((i: any) => ({ name: i.name })));
    });

    return fornecedor;
  }
}

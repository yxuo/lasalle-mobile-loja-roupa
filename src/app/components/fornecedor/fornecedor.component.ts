import { Component } from '@angular/core';
import { FornecedorObs } from '../../models/Fornecedor';
import { FornecedorService } from '../../services/fornecedor/fornecedor.service';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-list-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.scss',
})
export class FornecedorComponent {
  fornecedores: FornecedorObs[] = [];
  fornecedoresObs?: Observable<FornecedorObs[]>;

  constructor(
    private readonly fornecedorService: FornecedorService,
    private db: AngularFireDatabase
  ) {
    this.loadFornecedores();
  }

  ngOnInit(): void {
    this.fornecedoresObs = this.loadFornecedores();
    console.log('FO = ', this.fornecedores);
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
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, map } from 'rxjs';
import { Fornecedor, FornecedorObs } from '../../models/Fornecedor';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  private fornecedorSubject = new Subject<any>();
  fornecedor$ = this.fornecedorSubject.asObservable();

  constructor(
    private db: AngularFireDatabase,
    private _sanitizer: DomSanitizer,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  setFornecedor(value: any): void {
    this.fornecedorSubject.next(value);
  }

  insert(fornecedor: Fornecedor) {
    console.log('INSERT PROD', fornecedor);
    this.db
      .list('fornecedor')
      .push(fornecedor)
      .then((result: any) => {
        console.log('Inserir fornecedor:', result);
      });
  }

  update(id: string, fornecedor:Fornecedor) {
    console.log('id',id)
    this.db
      .list('fornecedor')
      .update(id, fornecedor)
      .catch((error: any) => {
        console.log(error);
      });
    return this.list();
  }

  delete(cnpj: string) {
    this.db
      .object(`fornecedor/${cnpj}`)
      .remove()
      .catch((error: any) => {
        console.log(error);
      });
  }

  list() {
    return this.db
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
  }
}

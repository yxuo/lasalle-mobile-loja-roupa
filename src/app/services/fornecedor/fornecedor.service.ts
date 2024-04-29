import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, map } from 'rxjs';
import { FornecedorObs } from '../../models/Fornecedor';
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
    console.log(this.fornecedorSubject);
  }
}

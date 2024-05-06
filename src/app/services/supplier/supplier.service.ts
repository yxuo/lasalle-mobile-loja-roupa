import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FornecedorObs } from '../../models/Fornecedor';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private supplierSubject = new Subject<FornecedorObs>();
  supplier$ = this.supplierSubject.asObservable();

  setSupplier(value: FornecedorObs): void {
    console.log(value);
    this.supplierSubject.next(value);
  }
}

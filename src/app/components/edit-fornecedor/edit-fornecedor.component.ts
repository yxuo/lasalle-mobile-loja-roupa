import { Component, Input } from '@angular/core';
import { SupplierService } from '../../services/supplier/supplier.service';
import { FornecedorObs } from '../../models/Fornecedor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-fornecedor',
  templateUrl: './edit-fornecedor.component.html',
  styleUrl: './edit-fornecedor.component.scss',
})
export class EditFornecedorComponent {
  supplier: FornecedorObs;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.supplier);
  }
}

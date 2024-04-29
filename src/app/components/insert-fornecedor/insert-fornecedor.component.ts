import { Component } from '@angular/core';
import { FornecedorService } from '../../services/fornecedor/fornecedor.service';
import { Fornecedor, FornecedorObs } from '../../models/Fornecedor';

@Component({
  selector: 'app-insert-fornecedor',
  templateUrl: './insert-fornecedor.component.html',
  styleUrl: './insert-fornecedor.component.scss',
})
export class InsertFornecedorComponent {
  fornecedorNome: string;
  fornecedorCnpj: string;

  constructor(private fornecedorService: FornecedorService) {}

  addFornecedor() {
    const newFornecedor: Fornecedor = {
      nome: this.fornecedorNome,
    };
    this.fornecedorService.insert(this.fornecedorCnpj, newFornecedor);
  }
}

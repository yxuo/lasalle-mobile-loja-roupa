import { Component } from '@angular/core';
import { FornecedorObs } from '../../models/Fornecedor';
import { FornecedorService } from '../../services/fornecedor/fornecedor.service';

@Component({
  selector: 'app-list-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.scss',
})
export class FornecedorComponent {
  fornecedores: FornecedorObs[] = [];

  constructor(private readonly fornecedorService: FornecedorService) {
    this.loadFornecedores();
  }

  ngOnInit(): void {
    this.fornecedorService.fornecedor$.subscribe((fornecedores) => {
      this.fornecedores = fornecedores;
    });
  }

  loadFornecedores() {
    // this.fornecedorService.fornecedor$.subscribe((fornecedores) => {
    //   this.fornecedores = fornecedores;
    // });
  }
}

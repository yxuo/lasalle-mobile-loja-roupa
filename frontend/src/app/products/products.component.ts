import { Component, inject } from '@angular/core';
import { Database } from '@angular/fire/database';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private database: Database = inject(Database);
  constructor() {
  }

}

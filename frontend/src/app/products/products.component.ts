import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './entities/product.entity';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products$: Observable<Product[]>;

  constructor(private productService: ProductsService) {
    this.products$ = this.productService.getAll();
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productService.getAll();
  }
}

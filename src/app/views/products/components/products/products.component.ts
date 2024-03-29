import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../entities/product.entity';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  newProductForm: any;
  name: string;
  description: string;
  price: number;
  search: string;
  searchFilter: Product[] | undefined;
  filtro: Product[] = [];

  addProduct() {
    const product: Product = {
      name: this.name,
      price: this.price,
      description: this.description,
    }
    this.productService.insertTest(product);
  }
  products$: Observable<Product[]>;

  constructor(private productService: ProductsService) {
    this.products$ = this.productService.getAll();
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productService.getAll();
    this.productService.getAll().subscribe((data) => {
      this.filtro = data
      this.searchFilter = data
    })
  }


  onSearchChange(search: Event) {
    console.log(search)
    const valueFilter = search.target as HTMLInputElement;
    const searchText = valueFilter.value;
    console.log(searchText)
    this.searchFilter = this.filtro.filter((data) => {
      for (const val of Object.values(data)) {
        if (
          val &&
          val.toString().toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').includes(searchText.toLowerCase().normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''))
        ) {
          return true;
        }
      }
      return false;
    });
    console.log(this.searchFilter)
  }
}


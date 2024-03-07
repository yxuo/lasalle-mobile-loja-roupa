import { Injectable } from '@angular/core';
import { Product } from '../entities/product.entity';
import { list } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) {

  }

  insert(product: Product) {
    this.db.list('products').push(product)
      .then((result: any) => {
        console.log(result);
      });
  }

  update(product: Product, key: string) {
    this.db.list('products').update(key, product)
      .catch((error: any) => {
        console.log(error);
      });
  }

  getAll(): Observable<Product[]> {
    return this.db.list('products')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({
            key: c.payload.key, ...{
              ...(c.payload.val() as Product),
            }
          }));
        })
      );
  }

  delete(id: string) {

  }
}

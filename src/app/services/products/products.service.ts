import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { list } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { DeepPartial } from '../../types/deep-partial.type';

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

  insertTest(product: Product) {
    this.db.list('products').push(product)
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

  find(where: DeepPartial<Product>): Observable<Product[]> {
    return this.db.list('products')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes
            .map(c => ({ key: c.payload.key, ...(c.payload.val() as Product) }))
            .filter(product => this.matchesConditions(product, where));
        })
      );
  }


  private matchesConditions(product: Product, conditions: DeepPartial<Product>): boolean {
    for (const p in conditions) {
      const prop = p as keyof Product;
      if (conditions.hasOwnProperty(prop) && product[prop] !== conditions[prop]) {
        return false;
      }
    }
    return true;
  }

  delete(id: string) {

  }
}

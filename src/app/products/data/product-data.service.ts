import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private productSource) { }
}

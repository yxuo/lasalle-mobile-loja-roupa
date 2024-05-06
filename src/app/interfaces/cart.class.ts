import { Produto } from "../models/Produto";

export class Cart {
  constructor(carrinho?: { produtoKey?: string; amount?: number }) {
    if (carrinho?.produtoKey) {
      this.produtoKey = carrinho.produtoKey;
    }
    if (carrinho?.amount) {
      this.amount = carrinho.amount;
    }
  }

  produtoKey: string = '';
  amount: number = 0;

  public static loadLocalStorage() {
    const produtoJson = localStorage.getItem('cart');
    if (!produtoJson) {
      return [];
    }
    const cartsList: any[] = JSON.parse(produtoJson);
    const carts = cartsList.map((i) => new Cart(i));
    return carts;
  }

  toObj() {
    return {
      produtoKey: this.produtoKey,
      amount: this.amount,
    };
  }

  public static saveLocalStorage(carts: Cart[]) {
    localStorage.setItem('cart', JSON.stringify(carts.map((i) => i.toObj())));
  }
}


export interface CartDTO {
  cart: Cart,
  product: Produto,
}
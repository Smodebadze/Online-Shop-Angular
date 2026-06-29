import { Component, signal } from '@angular/core';
import { Xelsawyo } from '../xelsawyo';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  constructor(public service: Xelsawyo) {
    this.showMyCart();
  }
  cartInfo = signal<any>([]);

  showMyCart() {
    this.cartInfo.set([]);

    this.service.cartInfo().subscribe({
      next: (cartData: any) => {
        const result: any[] = [];

        cartData.products.forEach((cartItem: any) => {
          const productId = cartItem.productId;

          this.service.getProductInfo(productId).subscribe((product: any) => {
            product.quantity = cartItem.quantity;
            result.push(product);
            this.cartInfo.set([...result]);
          });
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(itemID: string) {
    let info = {
      id: itemID,
    };
    this.service.delete(info).subscribe({
      next: (data: any) => {
        this.showMyCart();
      },
      error: (err: any) => {
        alert('ver waishala');
      },
    });
  }
}

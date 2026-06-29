import { Component, signal } from '@angular/core';
import { Xelsawyo } from '../xelsawyo';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [RouterLink, FormsModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  constructor(
    public service: Xelsawyo,
    public route: ActivatedRoute,
  ) {
    this.getTheParam();
  }

  details = signal<any>([]);

  getTheParam() {
    this.route.queryParams.subscribe({
      next: (param: any) => {
        this.details.set(param);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  rate: number = 5;
  quantity: number = 1;

addToCart(itemId: number) {
  this.service.getUserData().subscribe({
    next: (userData: any) => {
      this.service.cartInfo().subscribe({
        next: (cart: any) => {
          const existing = cart.products.find(
            (p: any) => p.productId === itemId
          );

          const info = {
            id: itemId,
            quantity: existing
              ? existing.quantity + this.quantity
              : this.quantity,
          };

          if (userData.cartID) {
            this.service.patchToCart(info).subscribe(() => {
              alert('Product has been added to the cart');
            });
          } else {
            this.service.postToCart(info).subscribe(() => {
              alert('Product has been added to the cart');
            });
          }
        },
      });
    },
    error: () => {
      alert('ჯერ გაიარე ავტორიზაცია');
    },
  });
}
}

import { Component, signal } from '@angular/core';
import { Xelsawyo } from '../xelsawyo';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [FormsModule, RouterLinkActive, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  constructor(public service: Xelsawyo) {
    this.GetAll();
    this.GetAllBrands();
    this.allProducts();
    this.showCards(1);
  }

  name: any;
  brand: any;
  rating: any;
  minPrice: any;
  maxPrice: any;
  cat: any;
  sortBy: any;
  sortDir: any;

  allSearch() {
    this.service
      .searchAll(
        this.name,
        this.cat,
        this.brand,
        this.rating,
        this.minPrice,
        this.maxPrice,
        this.sortBy,
        this.sortDir,
      )
      .subscribe({
        next: (data: any) => {
          this.allProducts.set(data.products);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  Filter(item: any) {
    this.service.filterBrands(item).subscribe({
      next: (data: any) => {
        this.allProducts.set(data.products);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  allBrands = signal<any>([]);

  GetAllBrands() {
    this.service.GetBrandFilter().subscribe({
      next: (data: any) => {
        this.allBrands.set(data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  allProducts = signal<any>([]);

  currentPage: number = 1;
  pages = signal<any>([]);

  showCards(item: any) {
    this.currentPage = item;

    this.service.ProdGetAll(this.currentPage).subscribe({
      next: (data: any) => {
        this.allProducts.set(data.products);

        let max = Math.ceil(data.total / data.limit);

        let pageList = [];
        for (let i = 1; i <= max; i++) {
          pageList.push(i);
        }
        this.pages.set(pageList);
      },
      error: (badData: any) => {
        console.log(badData);
      },
    });
  }

  GetAll() {
    this.service.ProdGetAll(1).subscribe({
      next: (data: any) => {
        this.allProducts.set(data.products);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  miniMenuOpen = false;

  miniToggleMenu() {
    this.miniMenuOpen = !this.miniMenuOpen;
  }



  
}

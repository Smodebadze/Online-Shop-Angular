import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Xelsawyo {
  constructor(
    public service: HttpClient,
    public cookie: CookieService,
  ) {}

  // signup / login

  signUp(info: any) {
    return this.service.post('https://api.everrest.educata.dev/auth/sign_up', info);
  }

  signIn(info: any) {
    return this.service.post('https://api.everrest.educata.dev/auth/sign_in', info);
  }

  // user data

  getUserData() {
    return this.service.get<any>('https://api.everrest.educata.dev/auth', {
      headers: {
        Authorization: `Bearer ${this.cookie.get('user')}`,
      },
    });
  }

  updateUserInfo(info: any) {
    return this.service.patch('https://api.everrest.educata.dev/auth/update', info, {
      headers: {
        Authorization: `Bearer ${this.cookie.get('user')}`,
      },
    });
  }

  // products

  filterBrands(item: any) {
    return this.service.get(
      `https://api.everrest.educata.dev/shop/products/brand/${item}?page_index=1&page_size=38`,
    );
  }

  ProdGetAll(item: any) {
    return this.service.get(
      `https://api.everrest.educata.dev/shop/products/all?page_index=${item}&page_size=15`,
    );
  }

  GetBrandFilter() {
    return this.service.get(`https://api.everrest.educata.dev/shop/products/brands`);
  }

  searchAll(
    name: any,
    catId: any,
    brand: any,
    rating: any,
    minPrice: any,
    maxPrice: any,
    sortBy: any,
    sortDir: any,
  ) {
    return this.service.get(
      `https://api.everrest.educata.dev/shop/products/search?page_index=1&page_size=38` +
        `&keywords=${name ?? ''}` +
        `&category_id=${catId ?? ''}` +
        `&brand=${brand ?? ''}` +
        `&rating=${rating ?? 1}` +
        `&price_min=${minPrice ?? 1}` +
        `&price_max=${maxPrice ?? 999999}` +
        `&sort_by=${sortBy ?? 'price'}` +
        `&sort_direction=${sortDir ?? 'asc'}`,
    );
  }

  // cart
  postToCart(info: any) {
    return this.service.post('https://api.everrest.educata.dev/shop/cart/product', info, {
      headers: { Authorization: `Bearer ${this.cookie.get('user')}` },
    });
  }
  patchToCart(info: any) {
    return this.service.patch('https://api.everrest.educata.dev/shop/cart/product', info, {
      headers: { Authorization: `Bearer ${this.cookie.get('user')}` },
    });
  }

  cartInfo() {
    return this.service.get('https://api.everrest.educata.dev/shop/cart', {
      headers: {
        Authorization: `Bearer ${this.cookie.get('user')}`,
      },
    });
  }

  getProductInfo(id: string) {
    return this.service.get(`https://api.everrest.educata.dev/shop/products/id/${id}`);
  }

  fullCards() {
    return this.service.get(
      `https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38`,
    );
  }

  delete(info: any) {
    return this.service.delete('https://api.everrest.educata.dev/shop/cart/product', {
      body: info,
      headers: { Authorization: `Bearer ${this.cookie.get('user')}` },
    });
  }
}

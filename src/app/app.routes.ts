import { Routes } from '@angular/router';
import { Products } from './products/products';
import { Profile } from './profile/profile';
import { Cart } from './cart/cart';
import { Details } from './details/details';
import { SignUp } from './sign-up/sign-up';

export const routes: Routes = [
    {path: ``, component: Products},
    {path: `profile`, component: Profile},
    {path: `cart`, component: Cart},
    {path: `details`, component: Details},
    {path: `signup`, component: SignUp},
];

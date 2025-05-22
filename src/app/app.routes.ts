import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'products', pathMatch: 'full'
    },
    {
        path: 'products', component: ProductsComponent
    },
    {
        path: 'products/:id', component: ProductDetailsComponent
    },
];
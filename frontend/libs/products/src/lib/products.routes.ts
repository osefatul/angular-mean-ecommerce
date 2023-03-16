import { Route } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

export const ProductRoutes: Route [] = [
  {path: "products", component: ProductsListComponent},
  {path: 'category/:categoryId', component:ProductsListComponent},
  {path: 'products/:productId', component: ProductPageComponent}
]
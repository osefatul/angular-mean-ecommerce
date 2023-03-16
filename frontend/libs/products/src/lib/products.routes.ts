import { Route } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';

export const ProductRoutes: Route [] = [
  {path: "products", component: ProductsListComponent}
]
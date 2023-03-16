import { OrdersModule } from '@ecommerce/orders';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductRoutes } from './products.routes';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProductRoutes),
    ButtonModule,
    CarouselModule,
    CheckboxModule,
    FormsModule
  ],
  declarations: [
    ProductsSearchComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    CategoriesBannerComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
  exports: [
    ProductsSearchComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    CategoriesBannerComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
})
export class ProductsModule {}

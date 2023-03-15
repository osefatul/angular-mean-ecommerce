import { OrdersModule } from '@ecommerce/orders';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ButtonModule } from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    CarouselModule,
    RouterModule
  ],
  declarations: [
    ProductsSearchComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    CategoriesBannerComponent,
  ],
  exports: [
    ProductsSearchComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    CategoriesBannerComponent,
  ],
})
export class ProductsModule {}

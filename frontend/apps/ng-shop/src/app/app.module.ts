import { UiModule } from '@ecommerce/ui';
import { OrdersModule } from '@ecommerce/orders';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@ecommerce/products';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    OrdersModule,
    ProductsModule,
    AccordionModule,
    BrowserAnimationsModule,
    UiModule,
    ToastModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NavComponent],
})
export class AppModule {}

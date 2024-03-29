import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ShellComponent } from './shared/shell/shell.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesService } from '@ecommerce/products';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import {FieldsetModule} from 'primeng/fieldset';
import { JwtInterceptor, UsersModule } from '@ecommerce/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrdersModule } from '@ecommerce/orders';
import { NgxStripeModule } from 'ngx-stripe';


const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputSwitchModule,
  DropdownModule,
  InputTextareaModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule,
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    ShellComponent,
    CategoriesFormComponent,
    CategoriesListComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    OrdersDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot({}),//for ngrx-state store
    EffectsModule.forRoot([]),//for ngrx-state effects
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UX_MODULE,
    UsersModule,
    OrdersModule,
    NgxStripeModule.forRoot("pk_test_51Lk5fxJXwXjcmUVPC4DvlU9FnpFuao2YlLuMhPuEULHtOk8tVrLYhoGdZHYF8Vczc0rse6UeOzb8USJ2qoaQFGH100818JkF64"),
  ],
  providers: [
    CategoriesService, 
    MessageService, 
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true
    }
  ],          
  bootstrap: [AppComponent],
  exports: [
    DashboardComponent,
    SidebarComponent,
    ShellComponent,
    ProductsListComponent,
    ProductsFormComponent,
    OrdersListComponent,
    OrdersDetailComponent,
  ],
})
export class AppModule {}

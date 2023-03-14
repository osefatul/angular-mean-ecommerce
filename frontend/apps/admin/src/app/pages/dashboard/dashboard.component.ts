import { Subject, takeUntil, combineLatest} from 'rxjs';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { OrdersService } from '@ecommerce/orders';
import { ProductsService } from '@ecommerce/products';
import { UsersService } from '@ecommerce/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics = [];
  endSub$: Subject<any> = new Subject();

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
      combineLatest([
        this.ordersService.getOrdersCount(),
        this.ordersService.getTotalSales(),
        this.productService.getProductsCount(),
        this.userService.getUsersCount(),
      ]).pipe(takeUntil(this.endSub$)).subscribe(values =>{
        this.statistics = values
      })
  }


  ngOnDestroy(): void {
    this.endSub$.complete();
}
}

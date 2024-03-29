import { Subject, takeUntil } from 'rxjs';
import {Component, OnInit,OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@ecommerce/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';


@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit, OnDestroy{
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endSub$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  ngOnDestroy(): void {
    this.endSub$.complete();
  }

  _getOrders() {
    // this.ordersService.getOrders().subscribe((orders) => {
    //   console.log(orders)
    //   this.orders = orders;
    // });

    this.ordersService.getOrders().
    pipe(takeUntil(this.endSub$)).subscribe((orders) => {
      // console.log(orders)
      this.orders = orders;
    });
  }

  showOrder(orderId) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }


  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe({
          complete: 
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!'
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!'
            });
          }
        }
        );
      }
    });
  }


}

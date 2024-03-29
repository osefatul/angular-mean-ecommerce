import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-thank-you',
  templateUrl: './thank-you.component.html',
  styles: [],
})
export class ThankYouComponent implements OnInit {
  constructor(
    private orderService:OrdersService,
    private cartService:CartService
    ){}

  ngOnInit(): void {
      const orderData = this.orderService.getCachedOrderData();

      this.orderService.createOrder(orderData).subscribe({
      next:() => {
        //empty the cart
        this.cartService.emptyCart();
        this.orderService.deleteCachedOrderData()
      },
      error:() => {
      //display some message to user
      console.log("Order could not be created")
      }
      });
  }
}

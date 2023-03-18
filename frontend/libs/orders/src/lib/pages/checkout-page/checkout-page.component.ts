import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@ecommerce/users';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { ORDER_STATUS } from '../../order.constants';
import { Subject, takeUntil } from 'rxjs';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})

export class CheckoutPageComponent implements OnInit, OnDestroy {
  
  
  
  checkoutFormGroup = new FormGroup({
    name: new FormControl ('', [Validators.required]),
    email: new FormControl ('', [Validators.email,Validators.required]),
    phone: new FormControl ('', [Validators.required]),
    city: new FormControl ('', [Validators.required]),
    country: new FormControl ('', [Validators.required]),
    zip: new FormControl ('', [Validators.required]),
    apartment: new FormControl ('', [Validators.required]),
    street: new FormControl ('', [Validators.required]),
  });
  
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
    private stripeService: StripeService
  ) {}


  // checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: string;
  countries = [];
  unsubscribe$: Subject<any> = new Subject();


  ngOnInit(): void {
    // this._initCheckoutForm();
    this._autoFillUserData();
    this._getCartItems();
    this._getCountries();
  }

  ngOnDestroy() {
    // this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get checkoutForm() {
    return this.checkoutFormGroup?.controls;
  }

  private _autoFillUserData() {
    console.log("checking autoFiller")
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        console.log(user)
        if (user) {
          this.userId = user?.id;
          this.checkoutForm['name'].setValue(user.name);
          this.checkoutForm['email'].setValue(user?.email);
          this.checkoutForm['phone'].setValue(user?.phone);
          this.checkoutForm['city'].setValue(user?.city);
          this.checkoutForm['street'].setValue(user?.street);
          this.checkoutForm['country'].setValue(user?.country);
          this.checkoutForm['zip'].setValue(user?.zip);
          this.checkoutForm['apartment'].setValue(user?.apartment);
        }
      });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street']?.value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city']?.value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };
    
    this.ordersService.cacheOrderData(order)

    this.ordersService.createCheckoutSession(this.orderItems).subscribe(error =>{
      if(error){
        console.log("error in redirect to payment")
      }
    })

  }
}

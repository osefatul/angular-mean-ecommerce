import { Component, Input } from '@angular/core';
import { CartItem, CartService } from '@ecommerce/orders';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent  {
  @Input() product!: Product;

  constructor(private cartService: CartService){}

  addProductToCart() {
    console.log(this.product.id)
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
  }
  
}
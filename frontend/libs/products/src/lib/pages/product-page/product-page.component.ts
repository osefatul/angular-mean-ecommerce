import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@ecommerce/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [],
})
export class ProductPageComponent implements OnInit, OnDestroy  {
  product!: Product;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;


  constructor(
    private prodService: ProductsService, 
    private route: ActivatedRoute,
    private cartService: CartService
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['productId']) {
        this._getProduct(params['productId']);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  addProductToCart() {
    // console.log("add to cart")
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity,
    }

    this.cartService.setCartItem(cartItem);
  }

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
      });
  }


}

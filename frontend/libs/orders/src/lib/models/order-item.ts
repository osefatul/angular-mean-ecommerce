import { Product } from "@ecommerce/products";

export interface OrderItem {
  product?: Product | any;
  quantity?: number | any;
}

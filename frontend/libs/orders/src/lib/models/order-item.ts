import { Product } from "@ecommerce/products";

export interface OrderItem {
  product?: Product;
  quantity?: number;
}

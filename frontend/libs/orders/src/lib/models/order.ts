import { OrderItem } from './order-item';
import { User } from '@ecommerce/users';

export interface Order {
  id?: string;
  orderItems?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: User | any;
  dateOrdered?: string;
}

import { Category } from './category';

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  richDescription?: string;
  image?: string;
  images?: string[];
  brand?: string;
  price?: any;
  category?: Category;
  countInStock?: any;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  dateCreated?: string;
}
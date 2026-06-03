import { Product } from '../models/product';

export interface ProductState {
  products: Product[];
  search: string;
  category: string;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
  total: number;
  hasMore: boolean;
}

export const initialState: ProductState = {
  products: [],
  search: '',
  category: 'all',
  page: 1,
  limit: 20,
  loading: false,
  error: null,
  total: 0,
  hasMore: true,
};

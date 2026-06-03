import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { initialState } from './product.state';

export const productReducer = createReducer(
  initialState,
  on(ProductActions.searchChanged, (state, { search }) => ({
    ...state,
    search,
    products: [],
    page: 1,
    hasMore: true,
  })),
  on(ProductActions.categoryChanged, (state, { category }) => ({
    ...state,
    category,
    products: [],
    page: 1,
    hasMore: true,
  })),
  on(ProductActions.loadMore, (state) => ({
    ...state,
    page: state.page + 1,
  })),
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductActions.loadProductsSuccess, (state, { products, total }) => ({
    ...state,
    products: [...state.products, ...products],
    loading: false,
    total,
    hasMore: state.products.length + products.length < total,
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

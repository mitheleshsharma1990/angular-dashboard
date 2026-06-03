import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(selectProductState, (state) => state.products);

export const selectFilters = createSelector(selectProductState, (state) => ({
  search: state.search,
  category: state.category,
}));

export const selectQuery = createSelector(selectProductState, (state) => ({
  search: state.search,
  category: state.category,
  page: state.page,
  limit: state.limit,
}));

import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Product } from '../models/product';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Search Changed': props<{ search: string }>(),
    'Category Changed': props<{ category: string }>(),
    'Load More': emptyProps(),
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: Product[]; total: number }>(),
    'Load Products Failure': props<{ error: string }>(),
  },
});

// export const searchChanged = createAction(
//   '[Products] Search Changed',
//   props<{ search: string }>()
// );

// export const loadProducts = createAction(
//   '[Products] Load Products'
// );

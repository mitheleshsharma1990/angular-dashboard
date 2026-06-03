import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { ProductService } from '../../dashboard/services/product.service';
import { ProductActions } from './product.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectQuery } from './product.selectors';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);
  private store = inject(Store);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.searchChanged, ProductActions.categoryChanged, ProductActions.loadMore),
      withLatestFrom(this.store.select(selectQuery)),
      switchMap(([_, { search, category, page, limit }]) => {
        const skip = (page - 1) * limit;

        let request$;
        if (search.trim() === '') {
          if (category === 'all') {
            request$ = this.productService.getProducts(skip);
          } else {
            request$ = this.productService.getProductByCategory(category, skip);
          }
        } else {
          request$ = this.productService.searchProducts(search, skip);
        }

        return request$.pipe(
          map((products) => {
            // Calculate total - estimation based on current batch
            const total = products.length > 0 ? page * limit + limit : page * limit;
            return ProductActions.loadProductsSuccess({ products, total });
          }),
          catchError((error) => of(ProductActions.loadProductsFailure({ error: error.message }))),
        );
      }),
    ),
  );
}

import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { ProductService } from '../../dashboard/services/product.service';
import { ProductActions } from './product.actions';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);
}

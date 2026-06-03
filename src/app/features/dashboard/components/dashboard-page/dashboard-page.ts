import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  scan,
  skip,
  debounceTime,
  distinctUntilChanged,
  startWith,
  Subject,
  switchMap,
  tap,
  combineLatest,
} from 'rxjs';
import { AppInfiniteScroll } from '../../../../shared/directives/app-infinite-scroll';
import { ProductService } from '../../services/product.service';
import { AsyncPipe } from '@angular/common';
import { Product } from '../../../products/models/product';

@Component({
  selector: 'app-dashboard-page',
  imports: [ReactiveFormsModule, AppInfiniteScroll, AsyncPipe],
  standalone: true,
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  productService = inject(ProductService);
  searchControl = new FormControl('', { nonNullable: true });
  categoryControl = new FormControl('all', { nonNullable: true });

  search$ = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    startWith(''),
  );

  category$ = this.categoryControl.valueChanges.pipe(distinctUntilChanged(), startWith('all'));

  private loadMoreSubject = new Subject<void>();

  loadMore$ = this.loadMoreSubject.asObservable();

  filters$ = combineLatest([this.search$, this.category$]).pipe(
    // skip the initial emission of combineLatest, since we already have startWith in both search$ and category$
    tap(([search, category]) => {
      console.log('filters changed:', { search, category });
    }),
  );

  metrics$ = this.filters$.pipe(
    switchMap(([search, category]) => {
      return this.loadMore$.pipe(
        startWith(void 0),

        scan((page) => page + 20, -20),

        switchMap((page) => {
          if (search.trim() === '') {
            if (category === 'all') {
              return this.productService.getProducts(page);
            } else {
              return this.productService.getProductByCategory(category, page);
            }
          } else {
            return this.productService.searchProducts(search, page);
          }
        }),
        scan((allMetrics, newMetrics) => {
          newMetrics.map((metric) => console.log('new metric:', metric.category));
          return [...allMetrics, ...newMetrics];
        }, [] as Product[]),
      );
    }),
  );

  loadMore() {
    this.loadMoreSubject.next();
  }
}

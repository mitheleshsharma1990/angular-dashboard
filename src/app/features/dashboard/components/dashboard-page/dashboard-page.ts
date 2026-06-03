import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, takeUntil, Subject } from 'rxjs';
import { AppInfiniteScroll } from '../../../../shared/directives/app-infinite-scroll';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../products/store/product.actions';
import { selectProducts } from '../../../products/store/product.selectors';

@Component({
  selector: 'app-dashboard-page',
  imports: [ReactiveFormsModule, AppInfiniteScroll, AsyncPipe],
  standalone: true,
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  searchControl = new FormControl('', { nonNullable: true });
  categoryControl = new FormControl('all', { nonNullable: true });

  metrics$ = this.store.select(selectProducts);

  ngOnInit() {
    // Dispatch on search changes (only on user input, not initial value)
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((search) => {
          console.log('search changed:', search);
          this.store.dispatch(ProductActions.searchChanged({ search }));
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();

    // Dispatch on category changes (only on user input, not initial value)
    this.categoryControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((category) => {
          console.log('category changed:', category);
          this.store.dispatch(ProductActions.categoryChanged({ category }));
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();

    // Load initial products - dispatch searchChanged to trigger initial load with page: 1
    this.store.dispatch(ProductActions.searchChanged({ search: '' }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMore() {
    this.store.dispatch(ProductActions.loadMore());
  }
}

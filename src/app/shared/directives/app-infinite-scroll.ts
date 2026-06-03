import {
  Directive,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter,
  inject,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class AppInfiniteScroll implements AfterViewInit, OnDestroy {
  @Output() loadMore = new EventEmitter<void>();
  elementRef = inject(ElementRef);
  private observer?: IntersectionObserver;
  ngAfterViewInit(): void {
    // IntersectionObserver always fires its callback once
    // immediately when you call .observe(), just to tell you
    // the current state of the element. It doesn't wait for the
    // element to enter the viewport — it reports right now, is it intersecting or not?
    // So if the last row of 10 results happens to be visible on screen,
    // the very first callback fires with isIntersecting: true,
    // which triggers loadMore even though the user never scrolled.
    // The initialized guard fixes this by simply ignoring that very
    // first callback, since we only care about the element scrolling
    // into view, not its state at mount time.
    let initialized = false;
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!initialized) {
          initialized = true;
          return;
        }
        if (entry.isIntersecting) {
          this.loadMore.emit();
        }
      },
      {
        root: null,
        threshold: 0.1,
      },
    );
    this.observer.observe(this.elementRef.nativeElement);
  }
  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

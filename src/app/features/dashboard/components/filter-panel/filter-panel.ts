import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';

@Component({
  selector: 'app-filter-panel',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.scss',
  standalone: true,
})
export class FilterPanel implements OnInit {
  @Output() seachTerm = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged())
      .subscribe((text) => {
        this.seachTerm.emit(text ?? '');
      });
  }
  searchControl = new FormControl('');
}

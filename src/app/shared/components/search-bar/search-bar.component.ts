import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { setSearchTerm } from '../../../core/store/media/media.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.sass',
})
export class SearchBarComponent {
  searchTerm = '';
  private searchTermSubject = new Subject<string>();

  constructor(private store: Store) {}

  ngOnInit() {
    this.searchTermSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.store.dispatch(setSearchTerm({ searchTerm }));
      });
  }

  onSearchChange(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }
}

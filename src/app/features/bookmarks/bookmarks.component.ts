import { Component } from '@angular/core';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Media } from '../../core/models/app.model';
import { selectFilteredBookMarks } from '../../core/store/media/media.selectors';
import { CardComponent } from "../../shared/components/card/card.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [SearchBarComponent, CardComponent, AsyncPipe],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.sass',
})
export class BookmarksComponent {
  filteredBookmarks$: Observable<Media[]>;
  constructor(private store: Store) {
    this.filteredBookmarks$ = this.store.select(selectFilteredBookMarks);
  }

}

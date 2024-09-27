import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import {
  selectFilteredMediaItems,
  selectMediaLoading,
} from '../../core/store/media/media.selectors';
import { Media } from '../../core/models/app.model';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { AsyncPipe } from '@angular/common';
import { AppState } from '../../core/store/app.state';
import { CardComponent } from '../../shared/components/card/card.component';
import { loadMedia } from '../../core/store/media/media.actions';

@Component({
  selector: 'app-media-category',
  standalone: true,
  imports: [NavbarComponent, SearchBarComponent, AsyncPipe, CardComponent],
  templateUrl: './media-category.component.html',
  styleUrl: './media-category.component.sass',
})
export class MediaCategoryComponent {
  filteredMediaItems$!: Observable<Media[]>;
  category: string | null = null;
  mediaLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.mediaLoading$ = this.store.select(selectMediaLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadMedia());

    this.filteredMediaItems$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.category = params.get('category');
        return this.store.select(selectFilteredMediaItems(this.category));
      })
    );
  }
}

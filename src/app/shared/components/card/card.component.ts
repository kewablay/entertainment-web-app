import { Component, Input } from '@angular/core';
import { Media } from '../../../core/models/app.model';
import { Store } from '@ngrx/store';
import { bookmarkMedia } from '../../../core/store/media/media.actions';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  @Input() media!: Media;
  @Input() isTrending!: boolean;

  constructor(private store: Store) {}


  onBookmarkClick() {
    this.store.dispatch(bookmarkMedia({ mediaId: this.media.id }));
  }
}

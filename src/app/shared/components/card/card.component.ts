import { Component, Inject, Input } from '@angular/core';
import { Media } from '../../../core/models/app.model';
import { Store } from '@ngrx/store';
import { bookmarkMedia } from '../../../core/store/media/media.actions';
import { Notyf } from 'notyf';
import { NOTYF } from '../../utils/notyf.token';

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

  constructor(private store: Store, @Inject(NOTYF) private notyf: Notyf) {}

  onBookmarkClick() {
    this.store.dispatch(bookmarkMedia({ mediaId: this.media.id }));
    if (this.media.isBookmarked) {
      this.notyf.success('Removed from bookmarks');
    } else {
      this.notyf.success('Added to bookmarks');
    }
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadMedia } from './core/store/media/media.actions';
import { selectAllMediaItems } from './core/store/media/media.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch(loadMedia());
  }
}

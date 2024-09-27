import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../../services/data-service/data.service';
import { select, Store } from '@ngrx/store';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';
import {
  bookmarkMedia,
  loadMedia,
  loadMediaError,
  loadMediaSuccess,
} from './media.actions';
import { catchError, of, switchMap, tap } from 'rxjs';
import { selectAllMediaItems } from './media.selectors';

@Injectable()
export class MediaEffects {
  constructor(
    private dataService: DataService,
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private store: Store
  ) {}

  loadMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMedia),
      switchMap(() => {
        const media = this.localStorageService.getItem('media');
        if (media) {
          return of(loadMediaSuccess({ media }));
        } else {
          return this.dataService.getData().pipe(
            switchMap((media) => {
              this.localStorageService.setItem('media', media);
              return of(loadMediaSuccess({ media }));
            })
          );
        }
      }),
      catchError((error) => {
        console.error('Error loading media:', error);
        return of(loadMediaError({ error }));
      })
    )
  );

  updateLocaStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookmarkMedia),
        switchMap(() =>
          this.store.pipe(
            select(selectAllMediaItems),
            tap((media) => this.localStorageService.setItem('media', media))
          )
        )
      ),
    { dispatch: false } // do not dispatch any actions
  );
}

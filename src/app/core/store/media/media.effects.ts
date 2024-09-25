import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../../services/data-service/data.service';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';
import { loadMedia, loadMediaSuccess } from './media.actions';
import { of, switchMap, tap } from 'rxjs';

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
      })
    )
  );
}

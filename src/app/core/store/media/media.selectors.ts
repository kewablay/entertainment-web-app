import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { MediaState } from './media.reducer';

// export const selectMediaState = (state: AppState) => state.media;

// export const selectAllMediaItems = createSelector(
//   selectMediaState,
//   (state) => mediaState.media
// );

export const selectMediaState = createFeatureSelector<MediaState>('media');

export const selectAllMediaItems = createSelector(
  selectMediaState,
  (state) => state.media
);

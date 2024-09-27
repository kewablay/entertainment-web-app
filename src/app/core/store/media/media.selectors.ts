import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MediaState } from './media.reducer';
import { Media } from '../../models/app.model';

export const selectMediaState = createFeatureSelector<MediaState>('media');

export const selectAllMediaItems = createSelector(
  selectMediaState,
  (state) => state.media
);

export const selectBookmarks = createSelector(selectMediaState, (state) =>
  state.media.filter((item: Media) => item.isBookmarked)
);

export const selectSearchTerm = createSelector(
  selectMediaState,
  (state) => state.searchTerm
);

export const selectFilteredMediaItems = (category: string | null) =>
  createSelector(
    selectAllMediaItems,
    selectSearchTerm,
    (mediaItems: Media[], searchTerm: string = '') => {
      return mediaItems.filter((item) => {
        const matchesSearch = item.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          !category || item.category.toLowerCase() === category.toLowerCase();
        return matchesSearch && matchesCategory;
      });
    }
  );

export const selectFilteredBookMarks = createSelector(
  selectBookmarks,
  selectSearchTerm,
  (mediaItems: Media[], searchTerm: string = '') => {
    return mediaItems.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }
);

export const selectMediaError = createSelector(
  selectMediaState,
  (state) => state.error
);

export const selectMediaLoading = createSelector(
  selectMediaState,
  (state) => state.loading
);

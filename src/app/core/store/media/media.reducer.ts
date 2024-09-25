import { createReducer, on } from '@ngrx/store';
import { Media } from '../../models/app.model';
import {
  loadMedia,
  loadMediaError,
  loadMediaSuccess,
  setSearchTerm,
} from './media.actions';

export interface MediaState {
  media: Media[];
  searchTerm: string;
  loading: boolean;
  error: any;
}

export const initialMediaState: MediaState = {
  media: [],
  searchTerm: '',
  loading: false,
  error: null,
};

export const mediaReducer = createReducer(
  initialMediaState,
  on(loadMedia, (state) => ({ ...state, loading: true })),
  on(loadMediaSuccess, (state, { media }) => ({
    ...state,
    media,
    loading: false,
  })),
  on(loadMediaError, (state, { error }) => ({ ...state, error })),
  on(setSearchTerm, (state, { searchTerm }) => ({ ...state, searchTerm }))
);

import { createReducer, on } from '@ngrx/store';
import { Media } from '../../models/app.model';
import { loadMedia, loadMediaError, loadMediaSuccess } from './media.actions';

export interface MediaState {
  media: Media[];
  loading: boolean;
  error: any;
}

export const initialMediaState: MediaState = {
  media: [],
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
  on(loadMediaError, (state, { error }) => ({ ...state, error }))
);

import { createAction, props } from '@ngrx/store';
import { Media } from '../../models/app.model';

// READ MEDIA
export const loadMedia = createAction('[Media] Load Media');
export const loadMediaSuccess = createAction(
  '[Media] Load Media Success',
  props<{ media: Media[] }>()
);
export const loadMediaError = createAction(
  '[Media] Load Media Error',
  props<{ error: any }>()
);

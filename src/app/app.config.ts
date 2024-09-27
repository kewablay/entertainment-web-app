import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { mediaReducer } from './core/store/media/media.reducer';
import { MediaEffects } from './core/store/media/media.effects';
import { NOTYF, notyfFactory } from './shared/utils/notyf.token';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({
      name: 'media',
      reducer: mediaReducer,
    }),
    provideEffects(MediaEffects),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: NOTYF, useFactory: notyfFactory },
  ],
};

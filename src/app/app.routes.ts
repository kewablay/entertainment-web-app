import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'media/:category',
    loadComponent: () =>
      import('./features/media-category/media-category.component').then(
        (m) => m.MediaCategoryComponent
      ),
  },
];

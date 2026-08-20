import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'quote',
    loadComponent: () =>
      import('../pages/quote/quote.component').then((m) => m.QuoteComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../pages/landing/landing.component').then((m) => m.LandingComponent),
  },
];

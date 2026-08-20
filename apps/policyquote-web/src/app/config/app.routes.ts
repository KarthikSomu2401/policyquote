import { Route } from '@angular/router';
import { LandingComponent } from '../pages/landing/landing.component';
import { QuoteComponent } from '../pages/quote/quote.component';

export const appRoutes: Route[] = [
  { path: '', component: LandingComponent },
  { path: 'quote', component: QuoteComponent },
];

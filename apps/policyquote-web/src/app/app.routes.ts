import { Route } from '@angular/router';
import { LandingComponent } from './landing.component';
import { QuoteComponent } from './quote.component';

export const appRoutes: Route[] = [
  { path: '', component: LandingComponent },
  { path: 'quote', component: QuoteComponent },
];

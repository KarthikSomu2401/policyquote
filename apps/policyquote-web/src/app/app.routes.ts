import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { QuoteComponent } from './quote.component';

export const appRoutes: Route[] = [
	{ path: 'quote', component: QuoteComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: '', pathMatch: 'full', redirectTo: 'quote' },
];

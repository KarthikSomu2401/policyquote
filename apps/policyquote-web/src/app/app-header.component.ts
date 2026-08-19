import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  styleUrl: './app-header.component.scss',
  template: `
    <header data-testid="app-header">
      <a class="brand" data-testid="brand-link" href="/" aria-label="PolicyQuote home">PolicyQuote</a>
    </header>
  `,
})
export class AppHeaderComponent {}

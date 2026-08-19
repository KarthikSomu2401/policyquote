import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  styleUrl: './app-header.component.scss',
  template: `
    <header>
      <a class="brand" href="/" aria-label="PolicyQuote home">PolicyQuote</a>
    </header>
  `,
})
export class AppHeaderComponent {}

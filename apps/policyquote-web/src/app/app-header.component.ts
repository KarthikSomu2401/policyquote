import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header>
      <a routerLink="/quote">PolicyQuote</a>
    </header>
  `,
})
export class AppHeaderComponent {}

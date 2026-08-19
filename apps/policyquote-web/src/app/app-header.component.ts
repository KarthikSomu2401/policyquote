import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink],
  styles: `
    :host {
      background: #1f2937;
      color: #ffffff;
      display: block;
      padding: 1rem 1.5rem;
    }

    header {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      max-width: 72rem;
    }

    nav {
      display: flex;
      gap: 1rem;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .brand {
      font-size: 1.125rem;
      font-weight: 700;
    }
  `,
  template: `
    <header>
      <a class="brand" routerLink="/quote">PolicyQuote</a>
      <nav aria-label="Primary navigation">
        <a routerLink="/quote">Quote</a>
        <a routerLink="/dashboard">Dashboard</a>
      </nav>
    </header>
  `,
})
export class AppHeaderComponent {}

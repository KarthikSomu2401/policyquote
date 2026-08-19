import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  styles: `
    :host {
      background: #ffffff;
      border-bottom: 1px solid #dbe3ef;
      box-sizing: border-box;
      display: block;
      width: 100%;
    }

    header {
      align-items: center;
      box-sizing: border-box;
      display: flex;
      margin: 0 auto;
      max-width: 72rem;
      min-height: 3.75rem;
      padding: 0.75rem 1rem;
    }

    .brand {
      color: #1e3a8a;
      font-size: 1.2rem;
      font-weight: 800;
      letter-spacing: 0.01em;
      text-decoration: none;
    }

    .brand:focus-visible {
      outline: 3px solid #60a5fa;
      outline-offset: 3px;
    }
  `,
  template: `
    <header>
      <a class="brand" href="/" aria-label="PolicyQuote home">PolicyQuote</a>
    </header>
  `,
})
export class AppHeaderComponent {}

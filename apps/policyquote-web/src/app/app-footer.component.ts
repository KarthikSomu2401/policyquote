import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  styles: `
    :host {
      border-top: 1px solid #d1d5db;
      color: #4b5563;
      display: block;
      padding: 1rem 1.5rem;
    }
  `,
  template: `
    <footer>
      <small>PolicyQuote</small>
    </footer>
  `,
})
export class AppFooterComponent {}

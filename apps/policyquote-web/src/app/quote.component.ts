import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-quote',
  template: `
    <section aria-labelledby="quote-title">
      <h1 id="quote-title">Quote</h1>
    </section>
  `,
})
export class QuoteComponent {}

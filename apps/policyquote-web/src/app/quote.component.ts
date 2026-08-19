import { Component, inject, signal } from '@angular/core';
import { QuoteApiService } from './quote-api.service';
import { QuoteFormComponent } from './quote-form.component';
import { QuoteResultComponent } from './quote-result.component';
import { QuoteRequest, QuoteResult } from './quote.types';

@Component({
  standalone: true,
  selector: 'app-quote',
  imports: [QuoteFormComponent, QuoteResultComponent],
  styles: `
    :host {
      display: block;
    }

    .quote-page {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin: 0 auto;
      max-width: 72rem;
    }

    .quote-content {
      align-items: flex-start;
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
    }

    app-quote-form,
    app-quote-result {
      flex: 1 1 20rem;
    }
  `,
  template: `
    <section class="quote-page" aria-labelledby="quote-title">
      <h1 id="quote-title">Quote</h1>

      <div class="quote-content">
        <app-quote-form (submitted)="requestQuote($event)" />

        <div>
          @if (loading()) {
            <p role="status">Loading quote...</p>
          }

          @if (errorMessage(); as message) {
            <p role="alert">{{ message }}</p>
          }

          @if (quoteResult(); as result) {
            <app-quote-result [result]="result" />
          }
        </div>
      </div>
    </section>
  `,
})
export class QuoteComponent {
  private readonly quoteApiService = inject(QuoteApiService);

  readonly loading = signal(false);
  readonly quoteResult = signal<QuoteResult | null>(null);
  readonly errorMessage = signal<string | null>(null);

  requestQuote(request: QuoteRequest): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.quoteResult.set(null);

    this.quoteApiService.getQuote(request).subscribe({
      next: (result) => {
        this.quoteResult.set(result);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to retrieve a quote. Please try again.');
        this.loading.set(false);
      },
    });
  }
}

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
      padding: 1rem 0;
    }

    h1 {
      color: #1e3a8a;
      margin: 0;
    }

    .quote-image {
      display: block;
      height: auto;
      max-width: 22rem;
      width: 100%;
    }

    .quote-content {
      align-items: flex-start;
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .quote-feedback {
      flex: 1 1 20rem;
      min-width: 0;
    }

    .loading,
    .error {
      margin: 0;
      padding: 0.75rem 1rem;
    }

    .loading {
      background: #eff6ff;
      color: #1e3a8a;
    }

    .error {
      background: #fef2f2;
      color: #991b1b;
    }

    app-quote-form,
    app-quote-result {
      flex: 1 1 20rem;
    }
  `,
  template: `
    <section class="quote-page" aria-labelledby="quote-title">
      <h1 id="quote-title">Quote</h1>
      <img
        class="quote-image"
        src="assets/policyquote-quote.svg"
        alt="Clipboard showing a home insurance quote checklist"
        width="640"
        height="360"
        loading="lazy"
        decoding="async"
      />

      <div class="quote-content">
        <app-quote-form (submitted)="requestQuote($event)" />

        <div class="quote-feedback">
          @if (loading()) {
            <p class="loading" role="status">Loading quote...</p>
          }

          @if (errorMessage(); as message) {
            <p class="error" role="alert">{{ message }}</p>
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

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
      width: 100%;
    }

    h1 {
      color: #1e3a8a;
      margin: 0;
    }

    .quote-banner {
      align-items: center;
      background: #eff6ff;
      border: 1px solid #dbe3ef;
      border-radius: 0.5rem;
      display: flex;
      min-height: 8rem;
      overflow: hidden;
      position: relative;
    }

    .quote-banner::after {
      background: rgba(15, 23, 42, 0.2);
      content: '';
      inset: 0;
      pointer-events: none;
      position: absolute;
    }

    .quote-image {
      display: block;
      height: 10rem;
      object-fit: cover;
      width: 100%;
    }

    .quote-banner-copy {
      color: #1e3a8a;
      font-size: 1.1rem;
      font-weight: 700;
      inset: 50% auto auto 1.25rem;
      max-width: 18rem;
      position: absolute;
      transform: translateY(-50%);
      z-index: 1;
    }

    .quote-content {
      align-items: flex-start;
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .quote-form-panel,
    .quote-feedback {
      min-width: 0;
    }

    .quote-form-panel {
      flex: 1 1 28rem;
    }

    .quote-feedback {
      flex: 1 1 20rem;
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
      display: block;
      min-width: 0;
    }

    @media (max-width: 560px) {
      .quote-page {
        gap: 1rem;
        padding: 0.75rem;
      }

      .quote-banner {
        min-height: 7rem;
      }

      .quote-image {
        height: 8rem;
      }

      .quote-banner-copy {
        font-size: 1rem;
        left: 1rem;
      }
    }
  `,
  template: `
    <section class="quote-page" aria-labelledby="quote-title">
      <h1 id="quote-title">Quote</h1>

      <section class="quote-banner" aria-label="Home insurance quote preparation">
        <img
          class="quote-image"
          src="assets/policyquote-quote.svg"
          alt="Clipboard showing a home insurance quote checklist"
          width="640"
          height="360"
          loading="lazy"
          decoding="async"
        />
        <p class="quote-banner-copy">A few details can help clarify your estimate.</p>
      </section>

      <div class="quote-content">
        <section class="quote-form-panel" aria-label="Quote request form">
          <app-quote-form (submitted)="requestQuote($event)" />
        </section>

        <section class="quote-feedback" aria-label="Quote result and request status">
          @if (loading()) {
            <p class="loading" role="status">Loading quote...</p>
          }

          @if (errorMessage(); as message) {
            <p class="error" role="alert">{{ message }}</p>
          }

          @if (quoteResult(); as result) {
            <app-quote-result [result]="result" />
          }
        </section>
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

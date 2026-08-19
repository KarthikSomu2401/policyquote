import { Component, inject, signal } from '@angular/core';
import { QuoteApiService } from './quote-api.service';
import { QuoteFormComponent } from './quote-form.component';
import { QuoteResultComponent } from './quote-result.component';
import { QuoteRequest, QuoteResult } from './quote.types';

@Component({
  standalone: true,
  selector: 'app-quote',
  imports: [QuoteFormComponent, QuoteResultComponent],
  styleUrl: './quote.component.scss',
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

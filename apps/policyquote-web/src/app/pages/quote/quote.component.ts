import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { QuoteApiService } from '../../services/quote-api.service';
import { QuoteFormComponent } from '../../components/quote-form/quote-form.component';
import { QuoteResultComponent } from '../../components/quote-result/quote-result.component';
import { QuoteRequest, QuoteResult } from '../../models/quote.types';

@Component({
  standalone: true,
  selector: 'app-quote',
  imports: [QuoteFormComponent, QuoteResultComponent],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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

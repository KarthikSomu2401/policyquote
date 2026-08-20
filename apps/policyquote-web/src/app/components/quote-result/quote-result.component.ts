import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { RiskBandBadgeComponent } from '../risk-band-badge/risk-band-badge.component';
import { QuoteResult } from '../../models/quote.types';

@Component({
  standalone: true,
  selector: 'app-quote-result',
  imports: [CurrencyFormatPipe, RiskBandBadgeComponent],
  templateUrl: './quote-result.component.html',
  styleUrl: './quote-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteResultComponent {
  readonly result = input.required<QuoteResult>();
}

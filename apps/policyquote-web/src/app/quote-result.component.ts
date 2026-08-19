import { Component, input } from '@angular/core';
import { RiskBandBadgeComponent } from './risk-band-badge.component';
import { QuoteResult } from './quote.types';

@Component({
  standalone: true,
  selector: 'app-quote-result',
  imports: [RiskBandBadgeComponent],
  template: `
    <section aria-labelledby="quote-result-title">
      <h2 id="quote-result-title">Quote result</h2>
      <p>Customer: {{ result().customerName }}</p>
      <p>Annual premium: {{ result().annualPremium }}</p>
      <p>Risk score: {{ result().riskScore }}</p>
      <app-risk-band-badge [riskScore]="result().riskScore" />
    </section>
  `,
})
export class QuoteResultComponent {
  readonly result = input.required<QuoteResult>();
}

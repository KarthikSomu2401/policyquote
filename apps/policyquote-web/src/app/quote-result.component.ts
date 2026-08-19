import { Component, input } from '@angular/core';
import { CurrencyFormatPipe } from './currency-format.pipe';
import { RiskBandBadgeComponent } from './risk-band-badge.component';
import { QuoteResult } from './quote.types';

@Component({
  standalone: true,
  selector: 'app-quote-result',
  imports: [CurrencyFormatPipe, RiskBandBadgeComponent],
  styleUrl: './quote-result.component.scss',
  template: `
    <section aria-labelledby="quote-result-title">
      <h2 id="quote-result-title">Quote result</h2>
      <div class="premium-summary">
        <p class="premium-label">Annual premium</p>
        <p class="premium-amount">{{ result().annualPremium | currencyFormat }}</p>
        <p class="monthly-premium">Approx. monthly premium: {{ result().annualPremium / 12 | currencyFormat }}</p>
      </div>

      <div class="summary" aria-labelledby="risk-summary-title">
        <h3 id="risk-summary-title">Risk summary</h3>
        <p>Customer: {{ result().customerName }}</p>
        <p>Risk score: {{ result().riskScore }}</p>
        <p>Risk band: <app-risk-band-badge [riskScore]="result().riskScore" /></p>
      </div>

      <div class="calculation">
        <h3>Coverage calculation</h3>
        <dl>
          <dt>Annual estimate</dt>
          <dd>{{ result().annualPremium | currencyFormat }}</dd>
          <dt>Monthly equivalent</dt>
          <dd>{{ result().annualPremium / 12 | currencyFormat }}</dd>
          <dt>Applied adjustments</dt>
          <dd>{{ result().appliedFactors.length }}</dd>
        </dl>
        <p class="estimate-note">This is an illustrative estimate, not a binding insurance offer.</p>
      </div>

      <div class="risk-factors">
        <h3>Risk factors</h3>
        @if (result().appliedFactors.length > 0) {
          <ul>
            @for (factor of result().appliedFactors; track factor.id) {
              <li>{{ factor.description }} ({{ factor.points }} points)</li>
            }
          </ul>
        } @else {
          <p>No additional risk factors applied.</p>
        }
      </div>
    </section>
  `,
})
export class QuoteResultComponent {
  readonly result = input.required<QuoteResult>();
}

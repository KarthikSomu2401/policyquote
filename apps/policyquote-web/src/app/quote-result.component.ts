import { Component, input } from '@angular/core';
import { RiskBandBadgeComponent } from './risk-band-badge.component';
import { QuoteResult } from './quote.types';

@Component({
  standalone: true,
  selector: 'app-quote-result',
  imports: [RiskBandBadgeComponent],
  styles: `
    :host {
      background: #f8fafc;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      display: block;
      padding: 1.25rem;
    }

    h2 {
      color: #1e3a8a;
      margin-top: 0;
    }

    .summary {
      display: grid;
      gap: 0.75rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .summary p {
      margin: 0;
    }

    .risk-factors {
      border-top: 1px solid #d1d5db;
      margin-top: 1rem;
      padding-top: 1rem;
    }

    ul {
      margin-bottom: 0;
      padding-left: 1.25rem;
    }

    li + li {
      margin-top: 0.5rem;
    }

    @media (max-width: 560px) {
      .summary {
        grid-template-columns: 1fr;
      }
    }
  `,
  template: `
    <section aria-labelledby="quote-result-title">
      <h2 id="quote-result-title">Quote result</h2>
      <div class="summary">
        <p>Customer: {{ result().customerName }}</p>
        <p>Annual premium: {{ result().annualPremium }}</p>
        <p>Risk score: {{ result().riskScore }}</p>
        <p>Risk band: <app-risk-band-badge [riskScore]="result().riskScore" /></p>
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

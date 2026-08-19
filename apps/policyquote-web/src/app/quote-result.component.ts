import { DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { RiskBandBadgeComponent } from './risk-band-badge.component';
import { QuoteResult } from './quote.types';

@Component({
  standalone: true,
  selector: 'app-quote-result',
  imports: [DecimalPipe, RiskBandBadgeComponent],
  styles: `
    :host {
      background: #f8fafc;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      display: block;
      min-width: 0;
      overflow-wrap: anywhere;
      padding: 1.25rem;
    }

    h2 {
      color: #1e3a8a;
      margin-top: 0;
    }

    .premium-summary {
      background: #ffffff;
      border: 1px solid #bfdbfe;
      border-radius: 0.4rem;
      padding: 1rem;
    }

    .premium-label,
    .monthly-premium {
      color: #4b5563;
      margin: 0;
    }

    .premium-amount {
      color: #1e3a8a;
      font-size: clamp(2rem, 7vw, 2.75rem);
      font-weight: 700;
      margin: 0.25rem 0;
    }

    .monthly-premium {
      font-size: 0.95rem;
    }

    .summary {
      background: #ffffff;
      border: 1px solid #dbe3ef;
      border-radius: 0.4rem;
      display: grid;
      gap: 0.75rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin-top: 1rem;
      padding: 1rem;
    }

    .summary p {
      margin: 0;
    }

    .summary h3 {
      grid-column: 1 / -1;
      margin: 0;
    }

    .risk-factors {
      background: #ffffff;
      border: 1px solid #dbe3ef;
      border-radius: 0.4rem;
      margin-top: 1rem;
      padding: 1rem;
    }

    .calculation {
      background: #ffffff;
      border: 1px solid #dbe3ef;
      border-radius: 0.4rem;
      margin-top: 1rem;
      padding: 1rem;
    }

    .calculation h3,
    .risk-factors h3 {
      margin-bottom: 0.75rem;
    }

    dl {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: 1fr auto;
      margin: 0;
    }

    dt {
      color: #4b5563;
    }

    dd {
      font-weight: 700;
      margin: 0;
      text-align: right;
    }

    .estimate-note {
      color: #4b5563;
      font-size: 0.875rem;
      line-height: 1.5;
      margin-bottom: 0;
    }

    .back-home {
      background: transparent;
      border: 1px solid #1d4ed8;
      border-radius: 0.25rem;
      color: #1e3a8a;
      cursor: pointer;
      display: inline-block;
      font: inherit;
      font-weight: 700;
      margin-top: 1rem;
      min-height: 2.75rem;
      padding: 0.7rem 1rem;
      text-align: center;
      text-decoration: none;
    }

    .back-home:hover,
    .back-home:focus-visible {
      background: #eff6ff;
    }

    .back-home:focus-visible {
      outline: 3px solid #60a5fa;
      outline-offset: 2px;
    }

    ul {
      margin-bottom: 0;
      padding-left: 1.25rem;
    }

    li + li {
      margin-top: 0.5rem;
    }

    li {
      line-height: 1.45;
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
      <div class="premium-summary">
        <p class="premium-label">Annual premium</p>
        <p class="premium-amount">£{{ result().annualPremium | number: '1.2-2' }}</p>
        <p class="monthly-premium">Approx. monthly premium: £{{ result().annualPremium / 12 | number: '1.2-2' }}</p>
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
          <dd>£{{ result().annualPremium | number: '1.2-2' }}</dd>
          <dt>Monthly equivalent</dt>
          <dd>£{{ result().annualPremium / 12 | number: '1.2-2' }}</dd>
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

      <button class="back-home" type="button" (click)="goHome()">Back to home</button>
    </section>
  `,
})
export class QuoteResultComponent {
  private readonly router = inject(Router);
  readonly result = input.required<QuoteResult>();

  goHome(): void {
    void this.router.navigate(['/']);
  }
}

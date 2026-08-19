import { Component, computed, input } from '@angular/core';
import { RiskBandName } from './quote.types';

@Component({
  standalone: true,
  selector: 'app-risk-band-badge',
  styles: `
    :host {
      display: inline-block;
    }

    span {
      background: #dbeafe;
      border-radius: 999px;
      color: #1e3a8a;
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
    }

    span[data-risk-band='HIGH_RISK'] {
      background: #fee2e2;
      color: #991b1b;
    }

    span[data-risk-band='ELEVATED'] {
      background: #fef3c7;
      color: #92400e;
    }
  `,
  template: `
    <span data-testid="risk-band" [attr.data-risk-band]="riskBand()">{{ riskBand() }}</span>
  `,
})
export class RiskBandBadgeComponent {
  readonly riskScore = input.required<number>();
  readonly riskBand = computed<RiskBandName>(() => {
    const score = this.riskScore();

    if (score >= 61) {
      return 'HIGH_RISK';
    }

    if (score >= 26) {
      return 'ELEVATED';
    }

    return 'STANDARD';
  });
}

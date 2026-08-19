import { Component, computed, input } from '@angular/core';
import { RiskBandName } from './quote.types';

@Component({
  standalone: true,
  selector: 'app-risk-band-badge',
  template: `
    <span [attr.data-risk-band]="riskBand()">{{ riskBand() }}</span>
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteResultComponent } from './quote-result.component';
import { QuoteResult } from '../../models/quote.types';
import { describe, expect, it, beforeEach } from '@jest/globals';

const baseResult: QuoteResult = {
  customerName: 'Alex Smith',
  annualPremium: 360,
  riskScore: 10,
  appliedFactors: [],
};

describe('QuoteResultComponent', () => {
  let fixture: ComponentFixture<QuoteResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteResultComponent);
  });

  it('renders the customer name, risk score, and premium summary', () => {
    fixture.componentRef.setInput('result', baseResult);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-testid="annual-premium"]')?.textContent,
    ).toContain('360');
    expect(compiled.textContent).toContain('Alex Smith');
    expect(compiled.textContent).toContain('Risk score: 10');
  });

  it('shows a fallback message when no risk factors are applied', () => {
    fixture.componentRef.setInput('result', baseResult);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-testid="risk-factors"]')?.textContent,
    ).toContain('No additional risk factors applied.');
  });

  it('lists each applied risk factor with its points', () => {
    fixture.componentRef.setInput('result', {
      ...baseResult,
      appliedFactors: [
        { id: 'flood-zone', description: 'Flood zone', points: 15 },
      ],
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('[data-testid="risk-factors"] li');

    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('Flood zone (15 points)');
  });
});

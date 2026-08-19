import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiskBandBadgeComponent } from './risk-band-badge.component';

describe('RiskBandBadgeComponent', () => {
  let component: RiskBandBadgeComponent;
  let fixture: ComponentFixture<RiskBandBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskBandBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RiskBandBadgeComponent);
    component = fixture.componentInstance;
  });

  it.each([
    [0, 'STANDARD'],
    [26, 'ELEVATED'],
    [61, 'HIGH_RISK'],
  ])('maps score %i to %s', (riskScore, expectedBand) => {
    fixture.componentRef.setInput('riskScore', riskScore);
    fixture.detectChanges();

    expect(component.riskBand()).toBe(expectedBand);
  });
});

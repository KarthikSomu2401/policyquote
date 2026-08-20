import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { of, throwError } from 'rxjs';
import { QuoteApiService } from '../../services/quote-api.service';
import { QuoteComponent } from './quote.component';
import { QuoteRequest, QuoteResult } from '../../models/quote.types';

const quoteRequest: QuoteRequest = {
  customerName: 'Alex Smith',
  age: 42,
  propertyType: 'House',
  propertyValue: 350000,
  postcode: 'AB1 2CD',
  previousClaims: 0,
};

const quoteResult: QuoteResult = {
  customerName: 'Alex Smith',
  annualPremium: 360,
  riskScore: 0,
  appliedFactors: [],
};

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;
  let quoteApiService: { getQuote: jest.Mock };

  beforeEach(async () => {
    quoteApiService = { getQuote: jest.fn() };
    await TestBed.configureTestingModule({
      imports: [QuoteComponent],
      providers: [{ provide: QuoteApiService, useValue: quoteApiService }],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
  });

  it('stores the API result and clears loading state', () => {
    quoteApiService.getQuote.mockReturnValue(of(quoteResult));

    component.requestQuote(quoteRequest);

    expect(quoteApiService.getQuote).toHaveBeenCalledWith(quoteRequest);
    expect(component.loading()).toBe(false);
    expect(component.quoteResult()).toEqual(quoteResult);
    expect(component.errorMessage()).toBeNull();
  });

  it('stores an error message when the API request fails', () => {
    quoteApiService.getQuote.mockReturnValue(
      throwError(() => new Error('Request failed')),
    );

    component.requestQuote(quoteRequest);

    expect(component.loading()).toBe(false);
    expect(component.quoteResult()).toBeNull();
    expect(component.errorMessage()).toBe(
      'Unable to retrieve a quote. Please try again.',
    );
  });
});

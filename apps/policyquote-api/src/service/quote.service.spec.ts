import { QuoteInput } from '../schema/quote-request.schema';
import { createQuote } from './quote.service';
import { describe, expect, it } from '@jest/globals';

const customer_quote: QuoteInput = {
  customerName: 'Karthik',
  propertyValue: 400000,
  age: 0,
  propertyType: 'House'
};

describe('createQuote', () => {
  it('creates a base quote', () => {
    const quote = createQuote(customer_quote);
    expect(quote.annualPremium).toBe(360);
  });

  it('adds points for a young customer', () => {
    const quote = createQuote(customer_quote);
    expect(quote.riskScore).toBe(20);
    expect(quote.appliedFactors[0].id).toBe('age_young');
  });
});

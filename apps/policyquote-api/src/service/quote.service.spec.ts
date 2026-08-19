import { createQuote } from './quote.service';
import { describe, expect, it } from '@jest/globals';

describe('createQuote', () => {
  it('creates a base quote', () => {
    const quote = createQuote({
      customerName: 'Karthik',
      propertyValue: 400000
    });

    expect(quote.annualPremium).toBe(360);
  });
});
import { QuoteInput } from '../schema/quote-request.schema';
import { createQuote } from './quote.service';
import { describe, expect, it } from '@jest/globals';

const customer_quote: QuoteInput = {
  customerName: 'Karthik',
  propertyValue: 400000
};

describe('createQuote', () => {
  it('creates a base quote', () => {
    const quote = createQuote(customer_quote);

    expect(quote.annualPremium).toBe(360);
  });
});
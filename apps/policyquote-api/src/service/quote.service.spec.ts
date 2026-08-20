import type { QuoteInput } from '../schema/types/quote-request';
import { createQuote } from './quote.service';
import { describe, expect, it } from '@jest/globals';

const customer_quote: QuoteInput = {
  customerName: 'Karthik',
  propertyValue: 400000,
  age: 40,
  propertyType: 'House',
  previousClaims: 0,
};

describe('createQuote', () => {
  it('creates a base quote', async () => {
    const quote = await createQuote(customer_quote);
    expect(quote.annualPremium).toBe(360);
  });

  it('adds points for a young customer', async () => {
    const quote = await createQuote({ ...customer_quote, age: 20 });
    expect(quote.riskScore).toBe(20);
    expect(quote.appliedFactors[0].id).toBe('age_young_elderly');
  });

  it('applies the STANDARD risk-band multiplier', async () => {
    const quote = await createQuote(customer_quote);

    expect(quote.riskScore).toBe(0);
    expect(quote.annualPremium).toBe(360);
  });

  it('applies the ELEVATED risk-band multiplier', async () => {
    const quote = await createQuote({ ...customer_quote, previousClaims: 3 });

    expect(quote.riskScore).toBe(30);
    expect(quote.annualPremium).toBe(540);
  });

  it('applies the HIGH_RISK risk-band multiplier', async () => {
    const quote = await createQuote({
      ...customer_quote,
      age: 80,
      previousClaims: 3,
      propertyValue: 800000,
    });

    expect(quote.riskScore).toBe(75);
    expect(quote.annualPremium).toBe(792);
  });

  it('applies a new postcode factor from KB data', async () => {
    const quote = await createQuote({ ...customer_quote, postcode: 'EX1 2AB' });

    expect(quote.riskScore).toBe(15);
    expect(quote.appliedFactors).toEqual([
      expect.objectContaining({ id: 'postcode_flood_zone', points: 15 }),
    ]);
  });
});

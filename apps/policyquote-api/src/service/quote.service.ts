import { QuoteInput } from '../schema/quote-request.schema';

export function createQuote(input: QuoteInput) {
  return {
    customerName: input.customerName,
    annualPremium: 360 // dummy value for now
  };
}
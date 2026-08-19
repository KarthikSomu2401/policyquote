import { loadKnowledgeBase } from '../kb-loader';
import { QuoteInput } from '../schema/quote-request.schema';

export function createQuote(input: QuoteInput) {
  const knowledgeBase = loadKnowledgeBase();

  const annualPremium =
    knowledgeBase.basePremium * knowledgeBase.coverageLoadFactor;

  return {
    customerName: input.customerName,
    annualPremium: Number(annualPremium.toFixed(2))
  };
}
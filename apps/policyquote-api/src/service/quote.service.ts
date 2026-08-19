import { loadKnowledgeBase } from '../kb-loader';
import { QuoteInput } from '../schema/quote-request.schema';
import { matchesCondition } from '../engine/evaluator';

export function createQuote(input: QuoteInput) {
  const knowledgeBase = loadKnowledgeBase();

  const appliedFactors = knowledgeBase.factors.filter((factor) =>
    matchesCondition(input, factor.condition),
  );

  const riskScore = appliedFactors.reduce(
    (total, factor) => total + factor.points,
    0,
  );

  const annualPremium =
    knowledgeBase.basePremium * knowledgeBase.coverageLoadFactor;

  return {
    customerName: input.customerName,
    annualPremium: Number(annualPremium.toFixed(2)),
    riskScore,
    appliedFactors,
  };
}

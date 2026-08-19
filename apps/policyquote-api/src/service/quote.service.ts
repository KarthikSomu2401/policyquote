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

  const riskBand = Object.values(knowledgeBase.riskBands).find(
    (band) => riskScore >= band.min && riskScore <= band.max,
  );

  const annualPremium =
    knowledgeBase.basePremium *
    knowledgeBase.coverageLoadFactor *
    (riskBand?.multiplier ?? 1);

  return {
    customerName: input.customerName,
    annualPremium: Number(annualPremium.toFixed(2)),
    riskScore,
    appliedFactors,
  };
}

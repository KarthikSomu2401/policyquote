import { loadKnowledgeBase } from '../kb-loader';
import type { KnowledgeBase } from '../schema/types/knowledgebase';
import type { QuoteInput } from '../schema/types/quote-request';
import { matchesCondition } from '../engine/risk-evaluator';

export async function createQuote(
  input: QuoteInput,
  knowledgeBase?: KnowledgeBase,
) {
  const activeKnowledgeBase = knowledgeBase ?? await loadKnowledgeBase();

  const appliedFactors = activeKnowledgeBase.factors.filter((factor) =>
    matchesCondition(input, factor.condition),
  );

  const riskScore = appliedFactors.reduce(
    (total, factor) => total + factor.points,
    0,
  );

  const riskBand = Object.values(activeKnowledgeBase.riskBands).find(
    (band) => riskScore >= band.min && riskScore <= band.max,
  );

  const annualPremium =
    activeKnowledgeBase.basePremium *
    activeKnowledgeBase.coverageLoadFactor *
    (riskBand?.multiplier ?? 1);

  return {
    customerName: input.customerName,
    kbVersion: activeKnowledgeBase.version,
    annualPremium: Number(annualPremium.toFixed(2)),
    riskScore,
    appliedFactors,
  };
}

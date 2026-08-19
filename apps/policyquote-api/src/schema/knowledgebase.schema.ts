import type { RiskBand, RiskFactor } from './risk.schema';

export interface KnowledgeBase {
  version: string;
  basePremium: number;
  coverageLoadFactor: number;
  riskBands: Record<string, RiskBand>;
  factors: RiskFactor[];
}
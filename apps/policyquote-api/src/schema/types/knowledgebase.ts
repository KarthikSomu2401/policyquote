import type { RiskBand, RiskBandName, RiskFactor } from './risk';

export interface KnowledgeBase {
  version: string;
  basePremium: number;
  coverageLoadFactor: number;
  riskBands: Record<RiskBandName, RiskBand>;
  factors: RiskFactor[];
}
import { RiskFactor } from "./risk.schema";

export interface KnowledgeBase {
  version: string;
  basePremium: number;
  coverageLoadFactor: number;
  factors: RiskFactor[];
}
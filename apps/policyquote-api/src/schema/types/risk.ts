import type { Condition } from './condition';

export type RiskBandName = 'STANDARD' | 'ELEVATED' | 'HIGH_RISK';

export interface RiskBand {
  min: number;
  max: number;
  multiplier: number;
}

export interface RiskFactor {
  id: string;
  description: string;
  condition: Condition;
  points: number;
}
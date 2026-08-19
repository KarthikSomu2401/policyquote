import type { Condition } from './condition.schema';

export interface RiskBand {
  min: number;
  max: number;
  multiplier: number;
}

export interface RiskFactor {
  id: string;
  description: string;
  field: 'age';
  operator: 'lt';
  value: number;
  condition: Condition;
  points: number;
}
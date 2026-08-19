import type { Condition } from './condition.schema';

export interface RiskFactor {
  id: string;
  description: string;
  field: 'age';
  operator: 'lt';
  value: number;
  condition: Condition;
  points: number;
}
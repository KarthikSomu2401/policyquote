export type ConditionOperator =
  | 'lt'
  | 'eq'
  | 'gt'
  | 'gte'
  | 'between'
  | 'outside_range';

export interface Condition {
  field: 'age' | 'previousClaims' | 'propertyType' | 'propertyValue';
  operator: ConditionOperator;
  value: string | number;
  min?: number;
  max?: number;
}
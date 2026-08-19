export type ConditionOperator = 'lt' | 'eq';

export interface Condition {
  field: 'age' | 'propertyType';
  operator: ConditionOperator;
  value: string | number;
}
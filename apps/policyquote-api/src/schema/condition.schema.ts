export type ConditionOperator =
  | 'lt'
  | 'eq'
  | 'gt'
  | 'gte'
  | 'between'
  | 'outside_range'
  | 'starts_with';

export type ConditionField =
  | 'age'
  | 'previousClaims'
  | 'propertyType'
  | 'propertyValue'
  | 'postcode';

export interface NumericCondition {
  field: ConditionField;
  operator: 'lt' | 'gt' | 'gte';
  value: number;
}

export interface RangeCondition {
  field: ConditionField;
  operator: 'between' | 'outside_range';
  min: number;
  max: number;
}

export interface ValueCondition {
  field: ConditionField;
  operator: 'eq' | 'starts_with';
  value: string | number;
}

export type Condition =
  | NumericCondition
  | RangeCondition
  | ValueCondition;
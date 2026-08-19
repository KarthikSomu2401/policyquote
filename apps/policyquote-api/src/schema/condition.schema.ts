export type ConditionOperator =
  | 'lt'
  | 'eq'
  | 'gt'
  | 'gte'
  | 'between'
  | 'outside_range'
  | 'starts_with';

type ConditionField =
  | 'age'
  | 'previousClaims'
  | 'propertyType'
  | 'propertyValue';

export type Condition =
  | {
      field: ConditionField;
      operator: Exclude<ConditionOperator, 'between' | 'outside_range' | 'starts_with'>;
      value: string | number;
      min?: number;
      max?: number;
    }
  | {
      field: ConditionField;
      operator: 'between' | 'outside_range';
      value?: string | number;
      min?: number;
      max?: number;
    }
  | {
      field: ConditionField;
      operator: 'starts_with';
      value: string;
    };
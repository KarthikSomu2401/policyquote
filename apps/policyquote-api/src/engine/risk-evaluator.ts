import type { QuoteInput } from '../schema/types/quote-request';
import type { Condition, ConditionOperator } from '../schema/types/condition';

export type ConditionEvaluator = (
  actualValue: unknown,
  condition: Condition,
) => boolean;

const conditionEvaluators = {
  lt: (actualValue, condition) =>
    'value' in condition && Number(actualValue) < Number(condition.value),
  eq: (actualValue, condition) =>
    'value' in condition && actualValue === condition.value,
  starts_with: (actualValue, condition) =>
    'value' in condition &&
    String(actualValue).startsWith(String(condition.value)),
  gt: (actualValue, condition) =>
    'value' in condition && Number(actualValue) > Number(condition.value),
  gte: (actualValue, condition) =>
    'value' in condition && Number(actualValue) >= Number(condition.value),
  between: (actualValue, condition) =>
    'min' in condition &&
    'max' in condition &&
    Number(actualValue) >= condition.min &&
    Number(actualValue) <= condition.max,
  outside_range: (actualValue, condition) =>
    'min' in condition &&
    'max' in condition &&
    (Number(actualValue) < condition.min || Number(actualValue) > condition.max),
} satisfies Record<ConditionOperator, ConditionEvaluator>;

export function matchesCondition(
  input: QuoteInput,
  condition: Condition,
): boolean {
  const actualValue = input[condition.field];
  return conditionEvaluators[condition.operator](actualValue, condition);
}
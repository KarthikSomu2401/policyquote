import type { QuoteInput } from '../schema/quote-request.schema';
import type {
  Condition,
  ConditionOperator,
} from '../schema/condition.schema';

type ConditionEvaluator = (
  actualValue: unknown,
  condition: Condition,
) => boolean;

const conditionEvaluators = {
  lt: (actualValue, condition) =>
    Number(actualValue) < Number(condition.value),
  eq: (actualValue, condition) => actualValue === condition.value,
  starts_with: (actualValue, condition) =>
    String(actualValue).startsWith(String(condition.value)),
  gt: (actualValue, condition) =>
    Number(actualValue) > Number(condition.value),
  gte: (actualValue, condition) =>
    Number(actualValue) >= Number(condition.value),
  between: (actualValue, condition) =>
    'min' in condition &&
    'max' in condition &&
    condition.min !== undefined &&
    condition.max !== undefined &&
    Number(actualValue) >= condition.min &&
    Number(actualValue) <= condition.max,
  outside_range: (actualValue, condition) =>
    'min' in condition &&
    'max' in condition &&
    condition.min !== undefined &&
    condition.max !== undefined &&
    (Number(actualValue) < condition.min || Number(actualValue) > condition.max),
} satisfies Record<ConditionOperator, ConditionEvaluator>;

export function matchesCondition(
  input: QuoteInput,
  condition: Condition,
): boolean {
  const actualValue = input[condition.field];
  return conditionEvaluators[condition.operator](actualValue, condition);
}

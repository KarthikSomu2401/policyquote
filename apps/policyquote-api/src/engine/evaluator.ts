import type { QuoteInput } from '../schema/quote-request.schema';
import type { Condition } from '../schema/condition.schema';

export function matchesCondition(
  input: QuoteInput,
  condition: Condition,
): boolean {
  const actualValue = input[condition.field];

  if (condition.operator === 'lt') {
    return Number(actualValue) < Number(condition.value);
  }

  if (condition.operator === 'gt') {
    return Number(actualValue) > Number(condition.value);
  }

  if (condition.operator === 'gte') {
    return Number(actualValue) >= Number(condition.value);
  }

  if (condition.operator === 'between') {
    return (
      condition.min !== undefined &&
      condition.max !== undefined &&
      Number(actualValue) >= condition.min &&
      Number(actualValue) <= condition.max
    );
  }

  if (condition.operator === 'outside_range') {
    return (
      condition.min !== undefined &&
      condition.max !== undefined &&
      (Number(actualValue) < condition.min || Number(actualValue) > condition.max)
    );
  }

  return actualValue === condition.value;
}

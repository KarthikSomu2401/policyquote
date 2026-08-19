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

  return actualValue === condition.value;
}

import { matchesCondition } from './evaluator';
import { describe, expect, it } from '@jest/globals';

describe('matchesCondition', () => {
  it('matches a value outside a configured range', () => {
  const quote = {
    customerName: 'Karthik',
    propertyValue: 400000,
    age: 80,
    propertyType: 'House' as const
  };

  expect(
    matchesCondition(quote, {
      field: 'age',
      operator: 'outside_range',
      value: 66,
      min: 25,
      max: 75
    })
  ).toBe(true);
  });
});
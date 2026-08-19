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

  it('matches a string prefix using starts_with', () => {
    expect(
      matchesCondition(
        {
          customerName: 'Karthik',
          propertyValue: 400000,
          age: 40,
          propertyType: 'House',
          postcode: 'EX1 2AB',
        },
        {
          field: 'postcode',
          operator: 'starts_with',
          value: 'EX',
        },
      ),
    ).toBe(true);
  });
});
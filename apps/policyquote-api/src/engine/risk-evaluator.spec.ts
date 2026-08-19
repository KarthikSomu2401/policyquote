import { matchesCondition } from './risk-evaluator';
import { describe, expect, it } from '@jest/globals';

import openApiDocument from '../assets/openapi.json';

describe('OpenAPI document', () => {
  it('documents the health and quote endpoints', () => {
    expect(openApiDocument.paths['/health'].get).toBeDefined();
    expect(openApiDocument.paths['/policy/quote'].post).toBeDefined();
  });
});

describe('matchesCondition', () => {
  const quote = {
    customerName: 'Karthik',
    propertyValue: 800000,
    age: 80,
    propertyType: 'Flat' as const,
    previousClaims: 3,
  };

  it('matches outside_range conditions', () => {
    expect(
      matchesCondition(quote, {
        field: 'age',
        operator: 'outside_range',
        min: 25,
        max: 75,
      }),
    ).toBe(true);
  });

  it('matches between conditions', () => {
    expect(
      matchesCondition(quote, {
        field: 'previousClaims',
        operator: 'between',
        min: 1,
        max: 3,
      }),
    ).toBe(true);
  });

  it('matches gte conditions', () => {
    expect(
      matchesCondition(quote, {
        field: 'previousClaims',
        operator: 'gte',
        value: 3,
      }),
    ).toBe(true);
  });

  it('matches eq conditions', () => {
    expect(
      matchesCondition(quote, {
        field: 'propertyType',
        operator: 'eq',
        value: 'Flat',
      }),
    ).toBe(true);
  });

  it('matches gt conditions', () => {
    expect(
      matchesCondition(quote, {
        field: 'propertyValue',
        operator: 'gt',
        value: 750000,
      }),
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
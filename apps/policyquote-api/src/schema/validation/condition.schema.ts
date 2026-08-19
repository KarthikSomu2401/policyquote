import { z } from 'zod';

export const conditionFieldSchema = z.enum([
  'age',
  'previousClaims',
  'propertyType',
  'propertyValue',
  'postcode',
]);

export const conditionSchema = z.union([
  z.object({
    field: conditionFieldSchema,
    operator: z.enum(['lt', 'gt', 'gte']),
    value: z.number(),
  }),
  z.object({
    field: conditionFieldSchema,
    operator: z.enum(['between', 'outside_range']),
    min: z.number(),
    max: z.number(),
  }),
  z.object({
    field: conditionFieldSchema,
    operator: z.enum(['eq', 'starts_with']),
    value: z.union([z.string(), z.number()]),
  }),
]);
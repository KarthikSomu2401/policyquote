import { z } from 'zod';
import { conditionSchema } from './condition.schema';

export const knowledgeBaseSchema = z.object({
  version: z.string(),
  basePremium: z.number(),
  coverageLoadFactor: z.number(),
  riskBands: z.object({
    STANDARD: z.object({ min: z.number(), max: z.number(), multiplier: z.number() }),
    ELEVATED: z.object({ min: z.number(), max: z.number(), multiplier: z.number() }),
    HIGH_RISK: z.object({ min: z.number(), max: z.number(), multiplier: z.number() }),
  }),
  factors: z.array(z.object({
    id: z.string(),
    description: z.string(),
    condition: conditionSchema,
    points: z.number(),
  })),
});
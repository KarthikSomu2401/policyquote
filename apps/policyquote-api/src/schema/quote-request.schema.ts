import { z } from 'zod';

export const quoteRequestSchema = z.object({
  customerName: z.string().trim().min(1),
  propertyValue: z.number().positive(),
  age: z.number().int().min(18).max(120),
  propertyType: z.enum(['House', 'Flat', 'Bungalow']),
  previousClaims: z.number().int().nonnegative().optional()
});

export type QuoteInput = z.infer<typeof quoteRequestSchema>;
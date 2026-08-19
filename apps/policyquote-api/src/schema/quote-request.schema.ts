import { z } from 'zod';

export const quoteRequestSchema = z.object({
  customerName: z.string().trim().min(1),
  propertyValue: z.number().positive()
});

export type QuoteInput = z.infer<typeof quoteRequestSchema>;
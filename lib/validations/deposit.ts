import { z } from 'zod';

export const depositSchema = z.object({
  bankName: z.string().min(3),
  alias: z.string().min(3).optional(),
  amount: z.number().positive(),
  depositDate: z.coerce.date(),
  termDays: z.number().int().min(1)
});

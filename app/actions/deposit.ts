'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const depositSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  alias: z.string().min(1, 'Alias cannot be empty'),
  amount: z.number().positive('Amount must be a positive number'),
  depositDate: z.string().min(1, 'Deposit date is required'),
  termDays: z.number().positive('Term days must be a positive number')
});

export type DepositFormData = z.infer<typeof depositSchema>;

export async function createDeposit(formData: FormData) {
  try {
    const rawData = {
      bankName: formData.get('bankName'),
      alias: formData.get('alias'),
      amount: Number(formData.get('amount')),
      depositDate: formData.get('depositDate'),
      termDays: Number(formData.get('termDays'))
    };

    // Validate the input data
    const validationResult = depositSchema.safeParse(rawData);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => err.message);
      return { error: errors.join(', ') };
    }

    const validated = validationResult.data;

    // Calculate due date
    const dueDate = new Date(validated.depositDate);
    dueDate.setDate(dueDate.getDate() + validated.termDays);

    const { error } = await supabase.from('deposits').insert({
      bank_name: validated.bankName,
      alias: validated.alias,
      amount: validated.amount,
      deposit_date: validated.depositDate,
      term_days: validated.termDays,
      due_date: dueDate.toISOString().split('T')[0],
      idempotency_key: crypto.randomUUID()
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath('/');
    return { success: true };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Unknown error occurred'
    };
  }
}

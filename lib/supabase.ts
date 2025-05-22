import { createClient } from '@supabase/supabase-js';

export type Deposit = {
  id: string;
  bankName: string;
  alias: string;
  amount: number;
  depositDate: string;
  dueDate: string;
  termDays: number;
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

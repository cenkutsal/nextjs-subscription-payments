import { createClient } from '@supabase/supabase-js';

export interface Deposit {
  bankName: string;
  alias: string;
  amount: number;
  depositDate: string;
  termDays: number;
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

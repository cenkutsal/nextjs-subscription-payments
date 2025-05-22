import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';

export async function getUserDeposits(user: User) {
  const supabase = createClient();
  const { data: deposits } = await supabase
    .from('deposits')
    .select(
      `
    id,
    bankName: "bank_name",
    alias,
    amount,
    depositDate: "deposit_date",
    dueDate: "due_date",
    termDays: "term_days"
  `
    )
    .eq('user_id', user?.id)
    .order('due_date', { ascending: true });

  return deposits;
}

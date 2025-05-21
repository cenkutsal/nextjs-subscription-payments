import { supabase } from '@/lib/supabase';
import { depositSchema } from '@/lib/validations/deposit';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const body = await req.json();
  const validated = depositSchema.parse(body);

  const { data, error } = await supabase.rpc('create_deposit', {
    p_bank_name: validated.bankName,
    p_alias: validated.alias,
    p_amount: validated.amount,
    p_deposit_date: validated.depositDate,
    p_term_days: validated.termDays,
    p_idempotency_key: crypto.randomUUID()
  });

  if (error) return Response.json(error, { status: 400 });
  return Response.json(data);
}

export async function GET() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('deposits')
    .select('*')
    .eq('user_id', user.id);

  if (error) console.error('Supabase error:', error);
  return Response.json(data);
}

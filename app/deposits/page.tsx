import DepositsTable from '@/components/DepositsTable';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Deposit } from '@/lib/supabase';

export default async function Deposits() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

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
    .order('deposit_date', { ascending: false });

  if (!deposits) {
    return <div>No deposits found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Your Deposits</h1>
      <DepositsTable deposits={deposits} />
    </div>
  );
}

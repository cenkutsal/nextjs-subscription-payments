import DepositsTable from '@/components/DepositsTable';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
    .order('due_date', { ascending: true });

  if (!deposits) {
    return <div>No deposits found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl text-gray-200 font-bold mb-4 text-center">
        Your Deposits
      </h1>
      <DepositsTable deposits={deposits} />
      <Link href="/" className="flex items-center justify-center ">
        <Button className="flex md:w-1/3 gap-2 mt-4" variant="slim">
          <ArrowLeft />
          <span>Back to Home</span>
        </Button>
      </Link>
    </div>
  );
}

import { DepositForm } from '@/components/DepositForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Page() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl text-gray-200 font-bold mb-4 text-center">
        Enter a new deposit
      </h1>
      <DepositForm />
      <Link href="/deposits" className="text-blue-500 hover:text-blue-600 mt-4">
        View Deposits
      </Link>
    </div>
  );
}

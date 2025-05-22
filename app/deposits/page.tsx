import { redirect } from 'next/navigation';
import DepositsTable from '@/components/DepositsTable';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getUserDeposits } from '../actions/userDeposits';
import { ensureAuth } from '../actions/auth';

export default async function Deposits() {
  const user = await ensureAuth();
  const deposits = await getUserDeposits(user);

  if (!deposits) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl text-gray-200 font-bold mb-4 text-center">
          No deposits found
        </h1>
      </div>
    );
  }

  if (!user) {
    redirect('/login?message=You must be logged in to access this page');
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

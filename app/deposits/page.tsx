import { redirect } from 'next/navigation';
import DepositsTable from '@/components/DepositsTable';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getUserDeposits } from '../actions/userDeposits';
import { ensureAuth } from '../actions/auth';

export default async function Deposits() {
  const user = await ensureAuth();
  const deposits = await getUserDeposits(user);

  if (!user) {
    redirect('/login?message=You must be logged in to access this page');
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-12">
      <div className="w-full max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Your Deposits</h1>
          <p className="text-gray-400">
            {deposits
              ? 'Manage and track all your fixed deposits in one place'
              : 'Start by adding your first deposit'}
          </p>
        </div>

        {!deposits ? (
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-xl text-gray-300 mb-4">No deposits found</h2>
            <Link
              href="/deposits/new"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Create Your First Deposit
            </Link>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <DepositsTable deposits={deposits} />
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <div className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200 flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

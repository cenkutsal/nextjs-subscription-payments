'use client';
import { createDeposit } from '@/app/actions/deposit';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

export function DepositForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await createDeposit(formData);
    if (res.error) {
      setErrors(res.error.split(','));
      return;
    }
    toast.success('Deposit created successfully');
    setErrors([]);
    formRef.current?.reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-12">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Create New Deposit
        </h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <div className="space-y-4">
            <input
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              type="text"
              name="bankName"
              placeholder="Bank Name"
            />
            <input
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              type="text"
              name="alias"
              placeholder="Alias"
            />
            <input
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              type="number"
              name="amount"
              placeholder="Amount"
            />
            <input
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              type="date"
              name="depositDate"
              placeholder="Deposit Date"
            />
            <input
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              type="number"
              name="termDays"
              placeholder="Term Days"
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 mt-4"
          >
            Create Deposit
          </button>

          {errors.length > 0 && (
            <div className="mt-4 p-4 bg-red-900/50 rounded-lg">
              {errors.map((error) => (
                <p key={error} className="text-red-400 text-sm">
                  {error}
                </p>
              ))}
            </div>
          )}
        </form>

        <Link
          href="/deposits"
          className="block text-center mt-6 text-blue-400 hover:text-blue-300 transition duration-200 font-semibold"
        >
          View All Deposits →
        </Link>
      </div>
    </div>
  );
}

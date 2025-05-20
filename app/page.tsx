'use client';

import React, { useRef } from 'react';
import { Deposit, supabase } from '@/lib/supabase';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Page() {
  const [errors, setErrors] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    const formData = new FormData(e.currentTarget);

    const deposit: Deposit = {
      bankName: formData.get('bankName') as string,
      alias: formData.get('alias') as string,
      amount: Number(formData.get('amount')),
      depositDate: formData.get('depositDate') as string,
      termDays: Number(formData.get('termDays'))
    };

    const errors: string[] = [];

    if (!deposit.bankName) errors.push('Bank name is required');
    if (isNaN(deposit.amount)) errors.push('Amount must be a number');
    if (!deposit.amount) errors.push('Amount is required');
    if (!deposit.depositDate) errors.push('Deposit date is required');
    if (!deposit.termDays) errors.push('Term days is required');
    if (!deposit.alias) errors.push(`Alias can't be empty`);

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    const { error } = await supabase.from('deposits').insert([
      {
        bankName: deposit.bankName,
        amount: deposit.amount,
        deposit_date: deposit.depositDate,
        term_days: deposit.termDays,
        due_date: new Date(
          new Date(deposit.depositDate).getTime() + deposit.termDays * 86400000
        ).toISOString()
      }
    ]);
    if (error) toast.error('Failed: ' + error.message);
    else {
      formRef.current?.reset();
      toast.success('Deposit added successfully');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-4">
        Deposit Tracker
      </h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <input
          name="bankName"
          className="border-2 border-gray-300 rounded-md p-2 text-black"
          type="text"
          placeholder="Bank Name"
        />
        <input
          name="alias"
          className="border-2 border-gray-300 rounded-md p-2 text-black"
          type="text"
          placeholder="Alias"
        />
        <input
          name="amount"
          className="border-2 border-gray-300 rounded-md p-2 text-black input-number"
          type="number"
          placeholder="Amount"
        />
        <label
          className="text-white flex flex-col gap-2 self-start w-full"
          htmlFor="depositDate"
        >
          Deposit Date
          <input
            className="border-2 border-gray-300 text-black rounded-md p-2"
            name="depositDate"
            type="date"
          />
        </label>
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          name="termDays"
          type="number"
          placeholder="Term Days"
          min="1"
        />
        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
          Submit
        </button>
        {errors.length > 0 && (
          <div className="text-red-500">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

'use client';

import React from 'react';
import { Deposit, supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function Page() {
  const [errors, setErrors] = useState<string[]>([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    const formData = new FormData(e.currentTarget);

    const deposit: Deposit = {
      bankName: formData.get('bankName') as string,
      amount: Number(formData.get('amount')),
      dueDate: formData.get('dueDate') as string
    };

    const errors: string[] = [];

    if (!deposit.bankName) errors.push('Bank name is required');
    if (isNaN(deposit.amount)) errors.push('Amount must be a number');
    if (!deposit.amount) errors.push('Amount is required');
    if (!deposit.dueDate) errors.push('Due date is required');

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    const { error } = await supabase.from('deposits').insert(deposit);
    if (error) alert('Failed: ' + error.message);
    else {
      alert('Deposit added successfully');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-4">
        Deposit Tracker
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4"
      >
        <input
          name="bankName"
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          placeholder="Bank Name"
        />
        <input
          name="amount"
          className="border-2 border-gray-300 rounded-md p-2"
          type="number"
          placeholder="Amount"
        />
        <input
          name="dueDate"
          className="border-2 border-gray-300 rounded-md p-2"
          type="date"
          placeholder="Due Date"
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

'use client';
import { createDeposit } from '@/app/actions/deposit';
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
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="border-2 border-gray-300 rounded-md p-2 text-black"
        type="text"
        name="bankName"
        placeholder="Bank Name"
      />
      <input
        className="border-2 border-gray-300 rounded-md p-2 text-black"
        type="text"
        name="alias"
        placeholder="Alias"
      />
      <input
        className="border-2 border-gray-300 rounded-md p-2 text-black"
        type="number"
        name="amount"
        placeholder="Amount"
      />
      <input
        className="border-2 border-gray-300 rounded-md p-2 text-black"
        type="date"
        name="depositDate"
        placeholder="Deposit Date"
      />
      <input
        className="border-2 border-gray-300 rounded-md p-2 text-black"
        type="number"
        name="termDays"
        placeholder="Term Days"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Create Deposit
      </button>
      {errors.map((error) => (
        <p key={error} className="text-red-500">
          {error}
        </p>
      ))}
    </form>
  );
}

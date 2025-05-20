'use client';

import React from 'react';

export default function Page() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const bankName = (form.elements[0] as HTMLInputElement).value;
    const amount = (form.elements[1] as HTMLInputElement).value;
    const dueDate = (form.elements[2] as HTMLInputElement).value;
    console.log({ bankName, amount, dueDate }); // <— Verify this works!
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
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          placeholder="Bank Name"
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="number"
          placeholder="Amount"
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="date"
          placeholder="Due Date"
        />
        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

'use client';
import { Deposit } from '@/lib/supabase';
import React from 'react';

const DepositsTable = ({ deposits }: { deposits: Deposit[] | null }) => {
  if (!deposits) return <div>No deposits found</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-blue-950 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Bank Name
            </th>
            <th className="px-6 py-3 bg-blue-950 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Alias
            </th>
            <th className="px-6 py-3 bg-blue-950 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 bg-blue-950 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Deposit Date
            </th>
            <th className="px-6 py-3 bg-blue-950 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-6 py-3 bg-blue-950 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Term Days
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/30 divide-y divide-gray-700">
          {deposits.map((deposit) => (
            <tr key={deposit?.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {deposit?.bankName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {deposit?.alias}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {deposit?.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {deposit?.depositDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {deposit?.dueDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {deposit?.termDays}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepositsTable;

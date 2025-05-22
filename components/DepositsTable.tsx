'use client';
import { Deposit } from '@/lib/supabase';
import React from 'react';

const DepositsTable = ({ deposits }: { deposits: Deposit[] | null }) => {
  if (!deposits)
    return (
      <div className="text-gray-400 text-center p-8 bg-gray-800 rounded-lg">
        No deposits found
      </div>
    );

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr className="bg-gradient-to-r from-gray-900 to-gray-800">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Bank Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Alias
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Deposit Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Term Days
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {deposits.map((deposit) => (
              <tr
                key={deposit?.id}
                className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {deposit?.bankName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {deposit?.alias}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-400">
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
    </div>
  );
};

export default DepositsTable;

'use client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { signOut } from '@/app/actions/auth';

interface HeaderProps {
  user: User | null;
  name: string | null | undefined;
}

export default function Header({ user, name }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          className="text-2xl font-bold text-white hover:text-blue-400 transition duration-200"
          href="/"
        >
          Deposit Tracker
        </Link>
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-6">
              <p className="text-gray-300">
                Welcome,{' '}
                <span className="font-semibold text-white">{name}</span>
              </p>
              <form action={signOut}>
                <button className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-white font-semibold hover:text-blue-400 transition duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

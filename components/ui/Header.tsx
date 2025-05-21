'use client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { signOut } from '@/app/actions/auth';

interface HeaderProps {
  user: User | null;
  userEmail: string | null | undefined;
}

export default function Header({ user, userEmail }: HeaderProps) {
  return (
    <header className="flex justify-between text-white p-4">
      <Link className="text-2xl font-bold" href="/">
        Deposit Tracker
      </Link>
      <div className="flex gap-4">
        {user ? (
          <div className="flex gap-4">
            <p>Logged in as {userEmail}</p>
            <form action={signOut}>
              <button>Logout</button>
            </form>
          </div>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}

import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] });

const title = 'Deposit Tracker';
const description = 'Track your deposits and get notified when they are due.';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <header className="flex justify-between text-white p-4">
          <Link className="text-2xl font-bold" href="/">
            Deposit Tracker
          </Link>
          {user ? (
            <form action="/auth/signout" method="POST">
              <button>Sign Out</button>
            </form>
          ) : (
            <div className="flex gap-4">
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          )}
        </header>
        <main
          id="skip"
          className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
        >
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}

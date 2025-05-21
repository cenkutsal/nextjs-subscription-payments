import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
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
  const { data: user } = await supabase.auth.getUser();
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <header className="flex justify-between text-white p-4">
          <Link className="text-2xl font-bold" href="/">
            Deposit Tracker
          </Link>
          <div className="flex gap-4">
            {user ? (
              <div className="flex gap-4">
                <p>Logged in as {user.user?.email}</p>
                <form
                  action={async () => {
                    'use server';
                    await supabase.auth.signOut();
                    redirect('/login');
                  }}
                >
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
        <main
          id="skip"
          className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
        >
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}

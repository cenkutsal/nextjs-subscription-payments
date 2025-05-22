import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { createClient } from '@/utils/supabase/server';
import Header from '@/components/ui/Header';

const inter = Inter({ subsets: ['latin'] });

const title = 'Deposit Tracker';
const description = 'Track your deposits and get notified when they are due.';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  themeColor: '#1a1b1e'
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} min-h-full bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header user={user} name={user?.user_metadata.full_name} />
          <main id="skip" className="flex-1 w-full">
            {children}
          </main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'bg-gray-800 text-white',
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151'
              }
            }}
          />
        </div>
      </body>
    </html>
  );
}

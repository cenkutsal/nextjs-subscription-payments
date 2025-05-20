import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] });

const title = 'Deposit Tracker';
const description = 'Track your deposits and get notified when they are due.';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
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

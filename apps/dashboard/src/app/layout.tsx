import '@repo/ui/globals.css';

import { cn } from '@repo/ui/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={cn('antialiased', inter.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

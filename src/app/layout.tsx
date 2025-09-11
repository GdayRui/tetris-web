import '@/styles/globals.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tetris Web Game',
  description: 'A modern Tetris game built with Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
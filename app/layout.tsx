import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Tetris Game",
  description: "A modern Tetris game built with Next.js and TypeScript",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

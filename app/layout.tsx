'use client';

/*import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Сфера",
  robots: { index: false, follow: false },
};*/
import { useStore } from '@nanostores/react'
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import {$themeClassName} from "@/app/themeStore";
const AppLayout = dynamic(() => import('@/components/app-layout'), {
  ssr: false,
});

const inter = Inter({
  subsets: ['cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeClassName = useStore($themeClassName)

  return (
    <html lang="ru" suppressHydrationWarning className={themeClassName}>
      <body className={`${inter.className} antialiased`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

"use client";

/*import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Сфера",
  robots: { index: false, follow: false },
};*/

import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
const AppLayout = dynamic(() => import("@/components/app-layout"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

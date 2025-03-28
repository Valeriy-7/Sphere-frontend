'use client';

import { authConfig, JWTAuthProvider } from '@/modules/auth';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryClientProvider } from '@/providers/QueryClientProvider';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <JWTAuthProvider config={authConfig}>
      <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      <Toaster />
    </JWTAuthProvider>
  );
}

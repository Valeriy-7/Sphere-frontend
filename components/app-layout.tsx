'use client';

import { authConfig, JWTAuthProvider, useJWTAuthContext } from '@/modules/auth';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryClientProvider } from '@/providers/QueryClientProvider';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useSelectedLayoutSegments } from 'next/navigation';

export default function AppLayout({ children }: PropsWithChildren) {
  const [lk] = useSelectedLayoutSegments();

  return (
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
      <JWTAuthProvider config={authConfig}>
        <TestJwt />
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        <Toaster />
      </JWTAuthProvider>
    </ThemeProvider>
  );
}

function TestJwt() {
  const { user, isLoggedIn } = useJWTAuthContext();

  return <h1>{isLoggedIn}</h1>;
}

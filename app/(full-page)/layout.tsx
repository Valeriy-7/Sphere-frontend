'use client';
import { PropsWithChildren } from 'react';
import { useJWTAuthContext } from '@/modules/auth';
import { usePathname, useRouter } from 'next/navigation';

export default function FullPageLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, user } = useJWTAuthContext();

  if (isLoggedIn && pathname === '/login' && user.regStatus === 'complete') {
    router.push('/');
    return null;
  }
  return <>{children}</>;
}

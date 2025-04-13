'use client';
import { PropsWithChildren, useEffect } from 'react';
import { useJWTAuthContext } from '@/modules/auth';
import { usePathname, useRouter } from 'next/navigation';

export default function FullPageLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, user } = useJWTAuthContext();

  useEffect(() => {
    if (isLoggedIn && pathname === '/login' && user.regStatus === 'verified') {
      router.push('/');
    }
  }, [isLoggedIn, pathname, user, router]);

  return <div className={'theme-login'}>{children}</div>;
}

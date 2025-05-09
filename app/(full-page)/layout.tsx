'use client';
import { PropsWithChildren, useEffect } from 'react';
import { useJWTAuthContext } from '@/modules/auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function FullPageLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams?.get('mode');
  const { isLoggedIn, user } = useJWTAuthContext();

  useEffect(() => {
    // Не выполняем редирект, если это режим создания кабинета
    if (mode === 'new-cabinet') {
      return;
    }

    if (isLoggedIn && pathname === '/login' && user.regStatus === 'verified') {
      router.push('/');
    }
  }, [isLoggedIn, pathname, user, router, mode]);

  return <div className={'theme-login'}>{children}</div>;
}

'use client';
import { AppSidebar } from '@/app/(main)/app-sidebar';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { PropsWithChildren, useEffect } from 'react';

import { LKTypeValue, ServerToClientMapType } from '@/lib/types';

import { useJWTAuthContext, useJWTAuthUser } from '@/modules/auth';
import { AppSpinner } from '@/components/app-spinner';
import * as React from 'react';
import { setThemeClassName } from '@/app/themeStore';
import { CabinetShortDataDtoType } from '@/kubb-gen';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
export default function MainLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { isLoggedIn, user } = useJWTAuthContext();

  const cabinetActive = user?.cabinets?.find((i) => i.isActive) ?? ({} as CabinetShortDataDtoType);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    if (user && user.regStatus !== 'verified') {
      let registrationUrl = searchParams?.get('registrationUrl');
      if (!registrationUrl && typeof window !== 'undefined') {
        registrationUrl = localStorage.getItem('registrationUrl') || undefined;
      }
      const redirectPath = registrationUrl
        ? `/login?mode=new-cabinet&registrationUrl=${registrationUrl}`
        : '/login?mode=new-cabinet';
      router.push(redirectPath);
      return;
    }

    if (user && user.role === 'admin') {
      setThemeClassName('admin');
    } else if (user) {
      setThemeClassName(cabinetActive.type as keyof typeof ServerToClientMapType);
    }
  }, [isLoggedIn, user, cabinetActive.type, router, searchParams]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/*   <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <ModeToggle/>
            </div>
          </header>*/}
          <div
            className="flex h-full max-h-[calc(100vh-10px)] flex-1 flex-col gap-4 overflow-hidden px-5 py-5"
            style={{ overflowClipMargin: 'content-box' }}
          >
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

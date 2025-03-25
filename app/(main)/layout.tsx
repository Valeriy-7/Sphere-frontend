'use client';
import { AppSidebar } from '@/app/(main)/app-sidebar';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { PropsWithChildren, useEffect } from 'react';

import ThemeWrap from '@/components/themeWrap';
import {LKTypeValue, ServerToClientMapType } from '@/lib/types';

import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import {useJWTAuthContext, useJWTAuthUser} from '@/modules/auth';
import { AppSpinner } from '@/components/app-spinner';
import * as React from 'react';
import {setThemeClassName} from "@/app/themeStore";
import {CabinetShortDataDtoType} from "@/kubb-gen";

export default function MainLayout({ children }: PropsWithChildren) {
  const [lk] = useSelectedLayoutSegments();
  const { isLoggedIn, user } = useJWTAuthContext();

  const cabinetActive = user?.cabinets?.find((i) => i.isActive) ?? ({} as CabinetShortDataDtoType);

  if (!isLoggedIn) {
    return null;
  }

  if(user.role ==='admin') {
    setThemeClassName('admin')
  } else {
    setThemeClassName(cabinetActive.type as keyof typeof ServerToClientMapType)
  }

  return (
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
          <div className="flex flex-1 flex-col gap-4 px-5 py-7">{children}</div>
        </SidebarInset>
      </SidebarProvider>
  );
}

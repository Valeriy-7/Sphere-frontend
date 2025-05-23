'use client';

import * as React from 'react';
import {
  AudioWaveform,
  ChevronsUpDown,
  Command,
  GalleryVerticalEnd,
  Plus,
  DoorOpen,
  Laptop,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useJWTAuthContext, useJWTAuthUser } from '@/modules/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cabinetsGetActiveSuspenseQueryKey, useCabinetsSetActive } from '@/kubb-gen';
import { useQueryClient, QueryCache } from '@tanstack/react-query';
import { CreateCabinetModal } from './create-cabinet-modal';

export function TeamSwitcher() {
  const { isMobile } = useSidebar();

  const { logout, fetchUser } = useJWTAuthContext();
  const { cabinetActive, cabinets, role, phone } = useJWTAuthUser();
  const queryClient = useQueryClient();
  // @todo табы переключаются только по тексту
  const { mutate } = useCabinetsSetActive({
    mutation: {
      onSuccess: () => {
        fetchUser();
        queryClient.invalidateQueries({
          queryKey: cabinetsGetActiveSuspenseQueryKey(),
        });
      },
    },
  });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="">
              <div className="flex aspect-square size-11 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground group-data-[collapsible=icon]:size-8">
                <Avatar>
                  <AvatarImage src={cabinetActive.avatarUrl || ''} />
                  <AvatarFallback>{cabinetActive.type}</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-normal">
                <span className="truncate font-medium">{cabinetActive.companyName}</span>
                <span className="truncate text-min">{cabinetActive.legalCompanyName}</span>
                {role === 'admin' && <span className="truncate text-min">{role}</span>}
                <span className="truncate text-min">{phone}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Личные кабинеты
            </DropdownMenuLabel>
            {cabinets.map(({ id, type, companyName, legalCompanyName, avatarUrl }) => (
              <DropdownMenuItem
                key={id}
                onClick={() => mutate({ id })}
                className="cursor-pointer gap-2 p-2"
              >
                <Avatar>
                  <AvatarImage src={avatarUrl || ''} />
                  <AvatarFallback>{type}</AvatarFallback>
                </Avatar>
                <div className={'flex min-w-0 flex-col'}>
                  <span className="truncate font-medium">{companyName}</span>
                  <span className="truncate text-min">{legalCompanyName}</span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <CreateCabinetModal />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => {
                queryClient.clear();
                logout();
              }}
            >
              <div className="flex size-6 items-center justify-center">
                <DoorOpen className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Выйти</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

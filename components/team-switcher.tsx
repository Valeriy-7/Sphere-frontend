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
import { useJWTAuthContext } from '@/modules/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cabinetsGetActiveSuspenseQueryKey, useCabinetsSetActive } from '@/kubb-gen';
import { useQueryClient } from '@tanstack/react-query';

export function TeamSwitcher() {
  const { isMobile } = useSidebar();

  const {
    user: { cabinets },
    logout,
    fetchUser,
  } = useJWTAuthContext();
  const queryClient = useQueryClient();
  const cabinetActive = cabinets.filter((i) => i.isActive)[0];
  // @TODO на интерфейсе не переключается н аактивный
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
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-11 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground group-data-[collapsible=icon]:size-8">
                <Avatar>
                  <AvatarImage src={cabinetActive.avatarUrl} />
                  <AvatarFallback>{cabinetActive.type}</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-normal">
                <span className="truncate font-medium">{cabinetActive.companyName}</span>
                <span className="truncate text-min">{cabinetActive.legalCompanyName}</span>
              </div>
              <ChevronsUpDown className="ml-auto"/>
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
            {cabinets.map(({ id, type, companyName, avatarUrl }) => (
              <DropdownMenuItem
                key={id}
                onClick={() => mutate({ id })}
                className="cursor-pointer gap-2 p-2"
              >
                <Avatar>
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>{type}</AvatarFallback>
                </Avatar>
                {companyName}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            {/*  <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Создать кабинет</div>
            </DropdownMenuItem>*/}
            <DropdownMenuItem className="gap-2 p-2" onClick={logout}>
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

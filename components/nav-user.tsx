'use client';

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useJWTAuthContext, useJWTAuthUser } from '@/modules/auth';
import {
  cabinetsGetActiveSuspenseQueryKey,
  useCabinetsSetActive,
  useCabinetsFindAll,
} from '@/kubb-gen';
import { useQueryClient } from '@tanstack/react-query';
import { CreateCabinetModal } from './create-cabinet-modal';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { logout } = useJWTAuthContext();
  const { cabinetActive } = useJWTAuthUser();
  const queryClient = useQueryClient();

  const { data: cabinets = [] } = useCabinetsFindAll();

  const { mutate } = useCabinetsSetActive({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: cabinetsGetActiveSuspenseQueryKey(),
        });
      },
    },
  });

  const handleActivateCabinet = (id: string) => {
    mutate({ id });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {cabinets.length > 0 && (
              <>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Кабинеты
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  {cabinets.map((cabinet) => (
                    <DropdownMenuItem
                      key={cabinet.id}
                      className={`cursor-pointer gap-2 p-2 ${cabinet.isActive ? 'bg-accent text-accent-foreground' : ''}`}
                      onClick={() => cabinet.id && handleActivateCabinet(cabinet.id)}
                    >
                      <Avatar className="h-6 w-6 rounded-md">
                        <AvatarImage
                          src={cabinet.avatarUrl || ''}
                          alt={cabinet.companyName || cabinet.legalCompanyName || ''}
                        />
                        <AvatarFallback className="rounded-md">
                          {cabinet.type?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {cabinet.companyName || cabinet.legalCompanyName || 'Кабинет'}
                        </span>
                        <span className="truncate text-xs">{cabinet.inn || ''}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}

            <CreateCabinetModal />

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

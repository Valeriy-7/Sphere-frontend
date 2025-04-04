'use client';
import Image from 'next/image';
import * as React from 'react';
import {
  AudioWaveform,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  SquareTerminal,
  Users,
  MessageSquare,
} from 'lucide-react';

import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  IconCalendar,
  IconCooperation,
  IconDocuments,
  IconEconomy,
  IconEmployees,
  IconHome,
  IconMarkets,
  IconPreparation,
  IconServices,
  IconSettings,
  IconStorage,
  IconDeliveryLeft,
  IconDeliveryRight,
  LogoText,
} from '@/components/app-icons';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/ModeToggle';
import { NavMain } from '@/components/nav-main';
import { LKType, LKTypeValue } from '@/lib/types';

// This is sample data.

import { usePathname, useParams, useSelectedLayoutSegments } from 'next/navigation';
import { useJWTAuthUser } from '@/modules/auth';

function getNavMain(type: LKTypeValue) {
  const common = [
    {
      name: 'Настройки',
      url: '/settings',
      icon: IconSettings,
    },
    {
      icon: MessageSquare,
      url: '/messenger',
      name: 'Мессенджер',
    },
  ];

  const navMain = {
    admin: [
      {
        name: 'Юзеры',
        url: '/admin/list/all',
        icon: Users,
      },
    ],
    wb: [
      {
        name: 'Склад',
        url: '/wb/storage/ff',
        icon: IconStorage,
      },
      {
        name: 'Поставки',
        url: '/wb/delivery/ff',
        icon: IconDeliveryRight,
      },
      ...common,
    ],
    ff: [
      {
        name: 'Склад',
        url: '/ff/storage',
        icon: IconStorage,
      },
      {
        name: 'Поставки',
        url: '/ff/delivery',
        icon: IconDeliveryRight,
      },
      {
        name: 'Подготовка',
        url: '/ff/prepare',
        icon: IconPreparation,
      },
      {
        name: 'Магазины',
        url: '/ff/partners',
        icon: IconMarkets,
      },
      {
        name: 'Услуги',
        url: '/ff/services/service',
        icon: IconServices,
      },
      ...common,
    ],
  };

  return navMain[type];
}

const navMainDev = [
  {
    name: 'ui',
    url: '#',
    icon: SquareTerminal,
    items: [
      {
        name: 'controls',
        url: '/ui/controls',
      },
      {
        name: 'currency-input',
        url: '/ui/currency-input',
      },
      {
        name: 'tanstack-pagination',
        url: '/ui/tanstack/pagination',
      },
      {
        name: 'tanstack-filter',
        url: '/ui/tanstack/filter',
      },
      {
        name: 'tasks',
        url: '/ui/tasks',
      },
      {
        name: 'Типографика',
        url: '/typography',
      },
      {
        name: '/login',
        url: '/login',
      },
      {
        url: '/all-tables',
        name: '/all-tables',
      },
      {
        url: '/payments',
        name: '/payments',
      },
    ],
  },
];
const pagesDev = [
  {
    name: 'pages',
    url: '#',
    icon: SquareTerminal,
    items: [
      {
        name: 'admin',
        url: '/admin',
        icon: IconHome,
      },
      ...getNavMain('admin'),
      {
        name: 'wb',
        url: '/wb',
        icon: IconHome,
      },
      ...getNavMain('wb'),
      {
        name: 'ff',
        url: '/ff',
        icon: IconHome,
      },
      ...getNavMain('ff'),
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { role, cabinetActive } = useJWTAuthUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className={'h-[38px]'}>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {role === 'admin' && <NavProjects projects={getNavMain('admin')} />}
        {cabinetActive.type === 'wildberries' && <NavProjects projects={getNavMain('wb')} />}
        {cabinetActive.type === 'fulfillment' && <NavProjects projects={getNavMain('ff')} />}

        {process.env.NODE_ENV === 'development' && (
          <>
            <NavMain items={pagesDev} />
            <NavMain items={navMainDev} />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className={'mb-6 flex flex-wrap items-center gap-3'}>
          {/* <SidebarTrigger />*/}
          <ModeToggle />
        </div>
        04.04.2025 15:15
        <LogoText></LogoText>
        {/*<Image width={180} height={60} src={'./logo-text.svg'} alt={'logo-text'}></Image>*/}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

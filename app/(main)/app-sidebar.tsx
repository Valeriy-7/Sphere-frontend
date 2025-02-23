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
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'ui',
      url: '#',
      icon: SquareTerminal,
      items: [
        {
          title: 'controls',
          url: '/ui/controls',
        },
        {
          title: 'currency-input',
          url: '/ui/currency-input',
        },
        {
          title: 'tanstack-pagination',
          url: '/ui/tanstack/pagination',
        },
        {
          title: 'tanstack-filter',
          url: '/ui/tanstack/filter',
        },
        {
          title: 'tasks',
          url: '/ui/tasks',
        },
        {
          title: 'Типографика',
          url: '/typography',
        },
        {
          title: '/login',
          url: '/login',
        },
        {
          url: '/all-tables',
          title: '/all-tables',
        },
        {
          url: '/payments',
          title: '/payments',
        },
      ],
    },
  ],
};

import { usePathname, useParams, useSelectedLayoutSegments } from 'next/navigation';

function getNavMain(type: LKTypeValue) {
  const [lk] = useSelectedLayoutSegments();

  const navMain = {
    admin: [
      {
        name: type,
        url: '#',
        icon: IconHome,
      },
      {
        name: 'Юзеры',
        url: '/admin/list/all',
        icon: Users,
      },
    ],
    wb: [
      {
        name: type,
        url: '/wb',
        icon: IconHome,
      },
      {
        name: 'Склад',
        url: '/wb/storage',
        icon: IconStorage,
      },
      {
        name: 'Поставки',
        url: '/wb/delivery',
        icon: IconDeliveryRight,
      },
    ],
    ff: [
      {
        name: type,
        url: '/ff',
        icon: IconHome,
      },
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
    ],
    common: [
      {
        name: 'Настройки',
        url: '/settings',
        icon: IconSettings,
      },
      {
        name: 'Главная',
        url: '/',
        icon: IconHome,
      },
    ],
  };

  return [...navMain[type], ...navMain.common];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className={'h-[48px]'}>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={getNavMain('admin')} />
        <NavProjects projects={getNavMain('ff')} />
        <NavProjects projects={getNavMain('wb')} />

        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className={'mb-6 flex flex-wrap items-center gap-3'}>
          {/* <SidebarTrigger />*/}
          <ModeToggle />
        </div>
        <LogoText></LogoText>
        {/*<Image width={180} height={60} src={'./logo-text.svg'} alt={'logo-text'}></Image>*/}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

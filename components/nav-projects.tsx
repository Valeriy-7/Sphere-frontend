'use client';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation';
import { type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const currentPath = usePathname();

  const [level1, level2] = useSelectedLayoutSegments();

  function getActive(href: string) {
    if (level2) {
      return href.includes(`${level1}/${level2}`);
    }
    return currentPath === href;
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name} isActive={getActive(item.url)}>
              <Link className={currentPath} href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            {/* <SidebarMenuBadge>23</SidebarMenuBadge>*/}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

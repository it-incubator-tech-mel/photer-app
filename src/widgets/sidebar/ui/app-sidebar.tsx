import { Sidebar } from './sidebar';
import { SidebarContent } from './sidebar-content';
import { SidebarGroup } from './sidebar-group';
import { SidebarGroupLabel } from './sidebar-group-label';
import { SidebarGroupContent } from './sidebar-group-content';
import { SidebarMenu } from './sidebar-menu';
import { SidebarMenuItem } from './sidebar-menu-item';
import { SidebarMenuButton } from './sidebar-menu-button';
import React from 'react';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#',
  },
  {
    title: 'Inbox',
    url: '#',
  },
  {
    title: 'Calendar',
    url: '#',
  },
  {
    title: 'Search',
    url: '#',
  },
  {
    title: 'Settings',
    url: '#',
  },
];

export function AppSidebar({
  className,
}: {
  className?: string;
}): React.ReactElement {
  return (
    <Sidebar className={className}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

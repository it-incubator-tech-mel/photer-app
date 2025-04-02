import { Sidebar } from './sidebar';
import { SidebarContent } from './sidebar-content';
import { SidebarGroup } from './sidebar-group';
import { SidebarGroupContent } from './sidebar-group-content';
import { SidebarMenu } from './sidebar-menu';
import { SidebarMenuItem } from './sidebar-menu-item';
import { SidebarMenuButton } from './sidebar-menu-button';
import React from 'react';
import { Button, IconSprite } from '@/shared/ui';
import { SidebarFooter } from './sidebar-footer';
import { LogoutButton } from '@/widgets/logout-button/LogoutButton';
import Link from 'next/link';
import { SpriteName } from 'public/icons/spriteNames';
import { cn } from '@/shared/lib/cn';
import { SIDEBAR_WIDTH } from '../hooks/use-sidebar';
// Типы для пунктов меню
type MenuItem = {
  title: string;
  icon: SpriteName;
  type: 'link' | 'action';
  path?: string;
  action?: () => void;
};

// Menu items.
const items: MenuItem[] = [
  {
    title: 'Feed',
    type: 'link',
    icon: 'home-outline',
    path: '/',
  },
  {
    title: 'Create',
    type: 'action',
    icon: 'plus-square-outline',
    action: (): void => {
      // Handle create action
      console.log('Create action');
    },
  },
  {
    title: 'My Profile',
    type: 'link',
    icon: 'person-outline',
    path: '/profile',
  },
  {
    title: 'Messenger',
    type: 'link',
    icon: 'message-circle-outline',
    path: '/messenger',
  },
  {
    title: 'Search',
    type: 'link',
    icon: 'search-outline',
    path: '/search',
  },
];
const items2: MenuItem[] = [
  {
    title: 'Statistics',
    type: 'link',
    icon: 'trending-up-outline',
    path: '/statistics',
  },
  {
    title: 'Favorites',
    type: 'link',
    icon: 'bookmark-outline',
    path: '/favorites',
  },
];

export function AppSidebar({
  className,
}: {
  className?: string;
}): React.ReactElement {
  return (
    <Sidebar className={cn(`w-[${SIDEBAR_WIDTH}]`, className)}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-[72px]">
              {items.map((item) => (
                <SidebarMenuItem
                  className="text-light-100 mb-6 ml-[60px]"
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    {item.type === 'link' && item.path ? (
                      <Link href={item.path} passHref>
                        <div className="flex items-center gap-2">
                          <IconSprite
                            iconName={item.icon}
                            width="24"
                            height="24"
                          />
                          <span className="medium-text-14">{item.title}</span>
                        </div>
                      </Link>
                    ) : (
                      <Button
                        variant="text"
                        onClick={item.action}
                        className="text-light-100 hover:text-light-100 active:text-light-100 focus:text-light-100 ml-2 w-auto cursor-pointer border-none p-0"
                      >
                        <IconSprite
                          iconName={item.icon}
                          width="24"
                          height="24"
                        />
                        <span className="medium-text-14 ml-2">
                          {item.title}
                        </span>
                      </Button>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items2.map((item) => (
                <SidebarMenuItem
                  className="text-light-100 mb-6 ml-[60px]"
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    {item.type === 'link' && item.path ? (
                      <Link href={item.path} passHref>
                        <div className="flex items-center gap-2">
                          <IconSprite
                            iconName={item.icon}
                            width="24"
                            height="24"
                          />
                          <span className="medium-text-14">{item.title}</span>
                        </div>
                      </Link>
                    ) : (
                      <Button
                        variant="text"
                        onClick={item.action}
                        className="text-light-100 hover:text-light-100 active:text-light-100 focus:text-light-100 ml-2 w-auto cursor-pointer border-none p-0"
                      >
                        <IconSprite
                          iconName={item.icon}
                          width="24"
                          height="24"
                        />
                        <span className="medium-text-14 ml-2">
                          {item.title}
                        </span>
                      </Button>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton
          openModal={function (): void {
            console.log('Logout modal opened');
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

// srcwidgets/side-bar/SidebarItem.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HoverDiv from './HoverDiv';
import { cn } from '@/shared/lib/cn';
import { IconSprite } from '@/shared/ui';
import { SpriteName } from 'public/icons/spriteNames';
import { authApi } from '@/features/auth/api/authApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/state/store';

type SidebarItemProps = {
  title: string | undefined;
  defaultIconName: SpriteName;
  activeIconName: SpriteName;
  path?: string;
  isSidebarOpen: boolean;
};

export default function SidebarItem({
  title,
  defaultIconName,
  activeIconName,
  path,
  isSidebarOpen,
}: SidebarItemProps): React.JSX.Element {
  const pathname = usePathname();
  const userId = useSelector(
    (state: RootState) => authApi.endpoints.getMe.select()(state).data?.userId
  );

  if (title === 'Profile' && userId) {
    path = `/profile/${userId}`;
    console.log(path);
  }

  return (
    <Link href={path ?? '#'}>
      <HoverDiv
        isActive={pathname === path}
        className={cn('flex w-full items-center gap-5 px-[20px]', {
          'min-w-[40px] flex-col items-start gap-1 rounded-full px-[12px]':
            !isSidebarOpen,
        })}
      >
        <IconSprite
          iconName={isSidebarOpen ? defaultIconName : activeIconName}
          className="mt-[4px] fill-white"
          width="24"
          height="24"
        />
        <p
          className={cn('text-sm font-semibold', {
            'text-[10px]': !isSidebarOpen,
          })}
        >
          {isSidebarOpen && title}
        </p>
      </HoverDiv>
    </Link>
  );
}

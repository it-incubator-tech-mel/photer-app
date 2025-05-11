// srcwidgets/side-bar/SidebarItem.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HoverDiv from './HoverDiv';
import { cn } from '@/shared/lib/cn';
import { IconSprite } from '@/shared/ui';
import { SpriteName } from 'public/icons/spriteNames';

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

  return (
    <Link href={path ?? '#'}>
      <HoverDiv
        isActive={pathname === path}
        className={cn(
          'text-2xlitems-center flex w-full items-center gap-5 px-[20px]',
          {
            'min-w-[40px] flex-col gap-1 rounded-full': !isSidebarOpen,
          }
        )}
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

// widgets/side-bar/SidebarItem.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HoverDiv from './HoverDiv';
import { cn } from '@/shared/lib/cn';

type SidebarItemProps = {
  title: string | undefined;
  defaultIcon: React.ReactNode;
  activeIcon: React.ReactNode;
  path?: string;
  isSidebarOpen: boolean;
};

export default function SidebarItem(
  props: SidebarItemProps
): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Link href={props.path ?? '#'}>
      <HoverDiv
        isActive={pathname === props.path}
        className={cn('flex w-full items-center gap-5', {
          'flex-col gap-2': !props.isSidebarOpen,
        })}
      >
        <section className="flex h-7 w-7 items-center text-2xl">
          {props.isSidebarOpen ? props.defaultIcon : props.activeIcon}
        </section>
        <p
          className={cn('text-sm font-semibold', {
            'text-[10px]': !props.isSidebarOpen,
          })}
        >
          {props.title}
        </p>
      </HoverDiv>
    </Link>
  );
}
// /////////////

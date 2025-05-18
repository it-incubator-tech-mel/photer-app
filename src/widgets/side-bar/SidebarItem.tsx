'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/cn';
import { IconSprite } from '@/shared/ui/icon/IconSprite';
import type { SpriteName } from '@/shared/ui/icon/IconSprite';

type SidebarItemProps = {
  path: string;
  title: string;
  isSidebarOpen: boolean;
  activeIcon: SpriteName;
  defaultIcon: SpriteName;
};

export function SidebarItem({
  path,
  title,
  isSidebarOpen,
  activeIcon,
  defaultIcon,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={cn(
        'hover:bg-dark-500 flex items-center overflow-hidden rounded-lg px-3 py-2 text-sm transition-all',
        {
          'bg-dark-700 text-white': isActive,
          'justify-center': !isSidebarOpen,
          'gap-4': isSidebarOpen,
        }
      )}
    >
      {/* Иконка через спрайт */}
      <IconSprite
        iconName={isActive ? activeIcon : defaultIcon}
        className="h-6 w-6 fill-white"
      />

      {/* Название — только если сайдбар открыт */}
      {isSidebarOpen && (
        <span className="truncate overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </span>
      )}
    </Link>
  );
}

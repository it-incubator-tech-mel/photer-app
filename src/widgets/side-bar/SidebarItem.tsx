// // src/widgets/side-bar/SidebarItem.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/cn';

type SidebarItemProps = {
  path: string;
  title: string;
  isSidebarOpen: boolean;
  activeIcon: React.ReactNode;
  defaultIcon: React.ReactNode;
};

export default function SidebarItem({
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
      {/* Иконка */}
      <span className="shrink-0 text-xl">
        {isActive ? activeIcon : defaultIcon}
      </span>

      {/* Название — только если сайдбар открыт */}
      {isSidebarOpen && (
        <span className="truncate overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </span>
      )}
    </Link>
  );
}

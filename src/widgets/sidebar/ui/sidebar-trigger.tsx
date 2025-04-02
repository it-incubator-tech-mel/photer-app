'use client';

import * as React from 'react';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';
import { useSidebar } from '../hooks/use-sidebar';
import { ComponentPropsWithoutRef } from 'react';

export const SidebarTrigger = ({
  className,
  onClick,
  ...props
}: ComponentPropsWithoutRef<'button'>): React.ReactElement => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      variant="primary"
      className={cn('w-full/2 h-10', className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <div>open/close</div>
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};
SidebarTrigger.displayName = 'SidebarTrigger';

'use client';
import * as React from 'react';
import { cn } from '@/shared/lib/cn';

export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
);

SheetHeader.displayName = 'SheetHeader';

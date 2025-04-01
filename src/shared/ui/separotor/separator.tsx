'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/shared/lib/cn';

export const Separator = ({
  className,
  orientation = 'vertical',
  decorative = true,
  ...props
}: React.ComponentPropsWithoutRef<
  typeof SeparatorPrimitive.Root
>): React.ReactElement => (
  <SeparatorPrimitive.Root
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'bg-dark-300 shrink-0',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    {...props}
  />
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

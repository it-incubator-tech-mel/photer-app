import { cn } from '@/shared/lib/cn';
import { Separator } from '@/shared/ui';

import * as React from 'react';

export const SidebarSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof Separator>): React.ReactElement => {
  return (
    <Separator
      data-sidebar="separator"
      className={cn('bg-dark-300 mx-2 w-auto', className)}
      {...props}
    />
  );
};
SidebarSeparator.displayName = 'SidebarSeparator';

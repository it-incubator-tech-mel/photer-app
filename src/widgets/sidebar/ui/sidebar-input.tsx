import * as React from 'react';
import { cn } from '@/shared/lib/cn';
import { Input } from '@/shared/ui';

export const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        'bg-background focus-visible:ring-sidebar-ring h-8 w-full shadow-none focus-visible:ring-2',
        className
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = 'SidebarInput';

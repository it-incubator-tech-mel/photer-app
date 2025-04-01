'use client';
import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/shared/lib/cn';

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: 'top' | 'bottom' | 'left' | 'right';
  }
>(({ side = 'right', className, children, ...props }, ref) => {
  const getSideClasses = (): string => {
    switch (side) {
      case 'top':
        return 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top';
      case 'bottom':
        return 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom';
      case 'left':
        return 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm';
      case 'right':
        return 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm';
      default:
        return '';
    }
  };

  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(
          'bg-background fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out',
          'data-[state=open]:animate-in data-[state=open]:duration-500',
          'data-[state=closed]:animate-out data-[state=closed]:duration-300',
          getSideClasses(),
          className
        )}
        {...props}
      >
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <div>X</div>
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
});

SheetContent.displayName = SheetPrimitive.Content.displayName;

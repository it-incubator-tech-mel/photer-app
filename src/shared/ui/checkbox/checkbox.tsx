'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/utils/cn';
import { Checked } from '../icons/checked';

/**
 * Компонент Checkbox, основанный на Radix UI.
 * @see https://www.radix-ui.com/docs/primitives/components/checkbox
 *
 * @param {boolean} checked - Управляет состоянием чекбокса (выбран/не выбран).
 * @param {function} onCheckedChange - Callback, вызываемый при изменении состояния чекбокса. Принимает новое значение `checked`.
 */
type Props = {
  label?: string;
  disabled?: boolean;
  id?: string;
};
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & Props
>(({ label, disabled, id, className, ...props }, ref): React.ReactElement => {
  const uniqueId = React.useId();
  id ??= uniqueId;

  return (
    <div className={cn('flex items-center gap-[11px]')}>
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        disabled={disabled}
        aria-label={label ? undefined : 'Checkbox'}
        aria-disabled={disabled}
        className={cn(
          'relative group peer h-5 w-5 border-2 rounded-sm border-light-100 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          className
        )}
        {...props}
      >
        <span
          className={cn(
            'absolute inset-0 w-9 h-9 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] border border-transparent rounded-full',
            'group-active:border-dark-100 group-active:bg-dark-100',
            'group-focus:border-dark-500 group-focus:bg-dark-500',
            'group-disabled:border-none group-disabled:bg-transparent',
            'group-hover:border-dark-300 group-hover:bg-dark-300',
            'z-[-1] transition-all duration-200'
          )}
        ></span>
        <CheckboxPrimitive.Indicator
          className={cn('flex items-center justify-center text-current')}
        >
          <Checked className="absolute w-min-24px h-min-24px" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label
        className={cn(
          'cursor-pointer text-sm text-light-100',
          disabled && 'text-light-900 cursor-not-allowed'
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

'use client';
import React, { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

const classesMap = {
  primary:
    'bg-accent-500 active:bg-accent-700 hover:bg-accent-100 disabled:bg-accent-900 focus:border-accent-700 w-[182px] rounded-[2px] border-2 border-transparent',
  secondary:
    'bg-dark-300 hover:bg-dark-100 disabled:bg-dark-500 focus:border-accent-300 w-[182px] rounded-[2px] border border-transparent active:bg-[#212121]',
  outlined:
    'text-accent-500 hover:text-accent-100 disabled:text-accent-900 focus:text-accent-700 active:text-accent-700 border-accent-500 hover:border-accent-100 disabled:border-accent-900 focus:border-accent-700 active:border-accent-700 border-accent-500 m-6 w-[182px] rounded-[2px] border',
  text: 'text-accent-500 hover:text-accent-100 disabled:text-accent-900 focus:text-accent-500 active:text-accent-700 focus:border-accent-700 w-25 rounded-[2px] border-2 border-transparent',
  icon: 'bg-dark-300 flex items-center justify-center px-3 py-[6px] w-[115px]',
};

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'icon';
};

function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps): React.ReactElement {
  return (
    <button
      className={cn('m-6 h-9', classesMap[variant], className)}
      {...props}
    />
  );
}

export { Button };

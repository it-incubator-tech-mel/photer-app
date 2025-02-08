'use client';
import React, { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  asChild?: boolean;
  icon?: React.ReactNode;
};

export const ButtonIcon = ({
  children,
  icon,
}: ButtonProps): React.ReactElement => {
  return (
    <button className="bold-text-16 text-light-100 bg-dark-300 m-6 flex h-9 w-[115px] items-center justify-between rounded-[2px] p-2">
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

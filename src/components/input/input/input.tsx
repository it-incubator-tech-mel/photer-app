'use client';
import { cn } from '@/utils/cn';
import { ComponentProps, useId } from 'react';

type Props = ComponentProps<'input'> & {
  type: 'text' | 'email' | 'password';
  label?: string;
  errorMessage?: string;
  className?: string;
};

export const Input = ({
  type,
  label,
  errorMessage,
  className = 'w-[279px]',
  disabled = false,
  ...rest
}: Props) => {
  const inputId = useId();

  const borderColor = errorMessage ? 'border-danger-500' : 'border-dark-100';

  let labelColor = 'text-light-900';
  if (errorMessage) labelColor = 'text-danger-500';
  if (disabled) labelColor = 'text-dark-100';

  const paddingBottom = errorMessage ? '' : 'pb-6';

  return (
    <div className={cn(paddingBottom)}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'font-regular flex flex-col text-sm leading-6',
            labelColor
          )}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={cn(
          'placeholder:text-light-900 disabled:placeholder:text-dark-100 text-light-900 active:text-light-100 active:border-light-100 hover:border-light-900 hover:text-light-900 disabled:border-dark-100 disabled:text-dark-100 focus:text-light-100 focus:border-accent-500 focus-visible:border-accent-500 rounded-[2px] border-1 px-3 py-1.5 text-base focus-visible:outline-none',
          borderColor,
          className
        )}
        disabled={disabled}
        {...rest}
      />
      {errorMessage && (
        <p className={'text-danger-500 text-regular text-sm leading-6'}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

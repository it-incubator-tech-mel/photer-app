'use client';
import { cn } from '@/utils/cn';
import { ComponentProps, ReactElement, useId, useState } from 'react';
import { IconSprite } from '../icon/IconSprite';

type Props = ComponentProps<'input'> & {
  type: 'text' | 'email' | 'password' | 'search';
  label?: string;
  errorMessage?: string;
  className?: string;
  onSearchClick?: () => void;
};

export const Input = ({
  type,
  label,
  errorMessage,
  className = '',
  onSearchClick,
  disabled = false,
  ...rest
}: Props): ReactElement => {
  const inputId = useId();

  const [isHidden, setIsHidden] = useState(true);

  const borderColor = errorMessage ? 'border-danger-500' : 'border-dark-100';

  let labelColor = 'text-light-900';
  if (errorMessage) {
    labelColor = 'text-danger-500';
  }
  if (disabled) {
    labelColor = 'text-dark-100';
  }

  let inputType = type;
  if (type === 'password') {
    inputType = isHidden ? 'password' : 'text';
  }

  const paddingBottom = errorMessage ? '' : 'pb-6';

  const fillIcon = disabled ? 'fill-dark-100' : 'fill-light-900';

  return (
    <div className={cn('box relative w-full max-w-[279px]', paddingBottom)}>
      {label && type !== 'search' && (
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
      {type === 'password' && (
        <button
          onClick={() => setIsHidden(!isHidden)}
          className="absolute right-2 bottom-8 cursor-pointer border-none focus-visible:outline-none"
          disabled={disabled}
        >
          <IconSprite
            iconName={isHidden ? 'eye-off-outline' : 'eye-outline'}
            className={fillIcon}
          />
        </button>
      )}
      {type === 'search' && (
        <button
          onClick={onSearchClick}
          disabled={disabled}
          className="absolute bottom-8 left-2 cursor-pointer border-none focus-visible:outline-none"
        >
          <IconSprite iconName="search" className={fillIcon} />
        </button>
      )}
      <input
        id={inputId}
        type={inputType}
        className={cn(
          'placeholder:text-light-900 disabled:placeholder:text-dark-100 text-light-900 active:text-light-100 active:border-light-100 hover:border-light-900 hover:text-light-900 disabled:border-dark-100 disabled:text-dark-100 focus:text-light-100 focus:border-accent-500 focus-visible:border-accent-500 w-full rounded-[2px] border-1 py-1.5 text-base focus-visible:outline-none',
          borderColor,
          type === 'password' ? 'pr-10' : 'pr-3',
          type === 'search' ? 'pr-2 pl-10' : 'pl-3',
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

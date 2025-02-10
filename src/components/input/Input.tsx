'use client';

import { cn } from '@/utils/cn';
import {
  ComponentProps,
  ReactElement,
  useId,
  useState,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { IconSprite } from '../icon/IconSprite';

type Props = ComponentProps<'input'> & {
  type?: 'text' | 'email' | 'password' | 'search';
  label?: string;
  errorMessage?: string;
  className?: string;
  onSearchClick?: () => void;
  onChangeValue?: (value: string) => void;
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const Input = ({
  type = 'text',
  label,
  errorMessage,
  className = '',
  onSearchClick,
  disabled = false,
  placeholder,
  onChange,
  onChangeValue,
  onEnter,
  onKeyDown,
  ...rest
}: Props): ReactElement => {
  const inputId = useId();

  const [isHidden, setIsHidden] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  let inputType = type;
  if (type === 'password' && !isHidden) {
    inputType = 'text';
  }

  let fillIcon = isFocused ? 'fill-light-100' : 'fill-light-900';
  if (disabled) {
    fillIcon = 'fill-dark-100';
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e);
    onChangeValue?.(e.currentTarget.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') {
      onEnter?.(e);
    }
    onKeyDown?.(e);
  };

  return (
    <div className={cn('box relative w-full', !errorMessage && 'pb-6')}>
      {label && type !== 'search' && (
        <label
          htmlFor={inputId}
          className={cn(
            'regular-text-14 text-light-900 flex flex-col text-sm leading-6',
            errorMessage && 'text-danger-500',
            disabled && 'text-dark-100'
          )}
        >
          {label}
        </label>
      )}
      {type === 'search' && (
        <button
          onClick={onSearchClick}
          disabled={disabled}
          className="absolute bottom-8 left-2 cursor-pointer border-none focus-visible:outline-none"
        >
          <IconSprite
            iconName="search"
            className={fillIcon}
            width="20"
            height="20"
          />
        </button>
      )}
      <input
        id={inputId}
        type={inputType}
        className={cn(
          'placeholder:text-light-900 disabled:placeholder:text-dark-100 text-light-900 active:text-light-100 active:border-light-100 hover:border-light-900 hover:text-light-900 disabled:border-dark-100 disabled:text-dark-100 focus:text-light-100 focus:border-accent-500 focus-visible:border-accent-500 border-dark-100 h-[36px] w-[279px] rounded-[2px] border-1 px-3 py-1.5 text-base focus-visible:outline-none',
          errorMessage && 'border-danger-500',
          type === 'password' && 'pr-10',
          type === 'search' && 'pr-2 pl-10',
          className
        )}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder={isFocused ? '' : placeholder}
        disabled={disabled}
        {...rest}
      />
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
      {errorMessage && (
        <p className={'text-danger-500 text-regular text-sm leading-6'}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

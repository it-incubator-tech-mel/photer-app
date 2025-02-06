'use client';
import { ComponentProps } from 'react';
import { cn } from '@/utils/cn';
import { IconSprite } from '@/components/icon/iconSprite';
import { Input } from '../input/input';

type Props = {
  errorMessage?: string;
  onSearchClick?: () => void;
} & Omit<ComponentProps<'input'>, 'type'>;

export const SearchInput = ({
  errorMessage,
  className,
  disabled,
  onSearchClick,
  ...rest
}: Props) => {
  return (
    <div className={cn('relative w-[279px]', className)}>
      <button
        onClick={onSearchClick}
        disabled={disabled}
        className="absolute bottom-8 left-2 cursor-pointer border-none focus-visible:outline-none"
      >
        <IconSprite
          iconName="search"
          width={24}
          height={24}
          className={disabled ? 'fill-dark-100' : 'fill-light-900'}
        />
      </button>
      <Input
        type="text"
        placeholder="Input search"
        className={'w-full pl-10'}
        errorMessage={errorMessage}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

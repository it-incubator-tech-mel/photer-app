'use client';
import { ComponentProps } from 'react';
import { IconSprite } from '../Icon/IconSprite';
import { Input } from './Input';
import { cn } from '@/utils/cn';

type Props = {
  errorMessage?: string;
  onSearchClick?: () => void;
} & Omit<ComponentProps<'input'>, 'type'>;

export const SearchInput = ({
  errorMessage,
  className,
  onSearchClick,
  ...rest
}: Props) => {
  return (
    <div className={cn('relative w-[279px]', className)}>
      <button
        onClick={onSearchClick}
        className="absolute bottom-8 left-2 cursor-pointer border-none focus-visible:outline-none"
      >
        <IconSprite
          iconName="search"
          width={24}
          height={24}
          className={'fill-light-100'}
        />
      </button>
      <Input
        type="text"
        placeholder="Input search"
        className={'w-full pl-10'}
        errorMessage={errorMessage}
        {...rest}
      />
    </div>
  );
};

'use client';
import { ComponentProps, useState } from 'react';
import { IconSprite } from '../Icon/IconSprite';
import { Input } from './Input';
import { cn } from '@/utils/cn';

type Props = {
  errorMessage?: string;
} & Omit<ComponentProps<'input'>, 'type'>;

export const PasswordInput = ({ errorMessage, className, ...rest }: Props) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className={cn('relative w-[279px]', className)}>
      <button
        onClick={() => setIsHidden(!isHidden)}
        className="absolute right-2 bottom-8 cursor-pointer border-none focus-visible:outline-none"
      >
        <IconSprite
          iconName={isHidden ? 'eye-off-outline' : 'eye-outline'}
          width={24}
          height={24}
          className={'fill-light-100'}
        />
      </button>
      <Input
        type={isHidden ? 'password' : 'text'}
        label="Password"
        placeholder="Password"
        className={'w-full pr-9'}
        errorMessage={errorMessage}
        onBlur={() => setIsHidden(true)}
        {...rest}
      />
    </div>
  );
};

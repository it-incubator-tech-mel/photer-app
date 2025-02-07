'use client';
import { ComponentProps, ReactElement, useState } from 'react';
import { cn } from '@/utils/cn';
import { IconSprite } from '@/components/icon/iconSprite';
import { Input } from '../input/input';

type Props = {
  errorMessage?: string;
} & Omit<ComponentProps<'input'>, 'type'>;

export const PasswordInput = ({
  errorMessage,
  className,
  disabled,
  ...rest
}: Props): ReactElement => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className={cn('relative w-[279px]', className)}>
      <button
        onClick={() => setIsHidden(!isHidden)}
        className="absolute right-2 bottom-8 cursor-pointer border-none focus-visible:outline-none"
        disabled={disabled}
      >
        <IconSprite
          iconName={isHidden ? 'eye-off-outline' : 'eye-outline'}
          width={24}
          height={24}
          className={disabled ? 'fill-dark-100' : 'fill-light-900'}
        />
      </button>
      <Input
        type={isHidden ? 'password' : 'text'}
        label="Password"
        placeholder="Password"
        className={'w-full pr-9'}
        errorMessage={errorMessage}
        onBlur={() => setIsHidden(true)}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

import { ReactElement } from 'react';
import * as Select from '@radix-ui/react-select';
import { SelectItemProps } from '@radix-ui/react-select';
import * as React from 'react';
import { cn } from '@/utils/cn';
import Image, { StaticImageData } from 'next/image';

type Props = SelectItemProps & {
  iconSrc?: StaticImageData | string;
};

export function SelectItem({
  children,
  className,
  iconSrc,
  ...props
}: Props): ReactElement {
  return (
    <Select.Item
      className={cn(
        'regular-text-16 flex h-[36px] items-center px-[12px]',
        'focus:outline-0',
        'hover:text-accent-500 hover:bg-dark-300',
        className
      )}
      {...props}
    >
      <Select.ItemText asChild>
        <div className={'flex flex-row gap-[12px]'}>
          {iconSrc && (
            <Image src={iconSrc} alt={'icon'} height={20} width={20} />
          )}
          {children}
        </div>
      </Select.ItemText>
    </Select.Item>
  );
}

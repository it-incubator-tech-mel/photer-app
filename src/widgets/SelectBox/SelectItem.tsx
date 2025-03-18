import { ReactElement } from 'react';
import * as Select from '@radix-ui/react-select';
import { SelectItemProps } from '@radix-ui/react-select';
import * as React from 'react';
import { cn } from '@/shared/lib/cn';
import Image, { StaticImageData } from 'next/image';

type Props = SelectItemProps & {
  icon?: StaticImageData | string;
};

export function SelectItem({
  children,
  className,
  icon,
  ...props
}: Props): ReactElement {
  return (
    <Select.Item
      className={cn(
        'regular-text-16 text-light-100 flex h-[36px] items-center px-[12px]',
        'focus:outline-0',
        'hover:text-accent-500 hover:bg-dark-300',
        className
      )}
      {...props}
    >
      <Select.ItemText asChild>
        <div className={'flex flex-row gap-[12px]'}>
          {icon && <Image src={icon} alt={'icon'} height={20} width={20} />}
          {children}
        </div>
      </Select.ItemText>
    </Select.Item>
  );
}

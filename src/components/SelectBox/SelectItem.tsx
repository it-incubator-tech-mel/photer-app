import { ReactElement } from 'react';
import * as Select from '@radix-ui/react-select';
import { SelectItemProps } from '@radix-ui/react-select';
import * as React from 'react';
import { cn } from '@/utils/cn';

type Props = SelectItemProps;

export function SelectItem({
  children,
  className,
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
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator />
    </Select.Item>
  );
}

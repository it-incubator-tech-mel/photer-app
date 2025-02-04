'use client';

import { ReactElement } from 'react';
import * as Select from '@radix-ui/react-select';
import { SelectProps } from '@radix-ui/react-select';
import { ChevronIcon } from '@/components/SelectBox/ChevronIcon';
import { cn } from '@/utils/cn';
import { validateChildrenValues } from '@/utils/validate-children-values';

type Props = SelectProps & {
  title?: string;
  width?: number;
  placeholder?: string;
};

export function SelectBox({
  title,
  width,
  placeholder,
  children,
  ...props
}: Props): ReactElement {
  const commonStyles = { width: `${width || 210}px` };

  validateChildrenValues(children);

  function onCloseHandler(e: Event): undefined {
    e.preventDefault();
  }

  return (
    <div className={'flex flex-col'}>
      {title && (
        <span className={'regular-text-14 text-light-900'}>{title}</span>
      )}
      <Select.Root {...props}>
        <Select.Trigger
          className={cn(
            'border-dark-100 group bg-dark-700 regular-text-16 flex h-[36px] cursor-pointer items-center justify-between rounded-[2px] border px-[12px]',
            'focus:outline-accent-500 focus:outline-[2px]',
            'hover:text-light-900',
            'disabled:text-dark-100',
            'data-[state=open]:border-light-100 data-[state=open]:bg-dark-500 data-[state=open]:rounded-b-none'
          )}
          style={commonStyles}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <ChevronIcon
              className={
                'duration-500 ease-in-out group-data-[state=open]:-rotate-180'
              }
            />
          </Select.Icon>
        </Select.Trigger>

        <Select.Content
          className={cn(
            'bg-dark-500 border-light-100 cursor-pointer rounded-b-[2px] border',
            'border-t-0'
          )}
          style={commonStyles}
          position={'popper'}
          onCloseAutoFocus={onCloseHandler}
        >
          <Select.Viewport>{children}</Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  );
}

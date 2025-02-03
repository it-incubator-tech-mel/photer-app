'use client';

import { ReactElement, useRef, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { SelectProps } from '@radix-ui/react-select';
import { SelectItem } from '@/components/SelectBox/SelectItem';
import { ChevronIcon } from '@/components/SelectBox/ChevronIcon';
import { cn } from '@/utils/cn';

//todo: доделать анимацию появления и исчезновения списка
//todo: доделать disabled стили

type Props = SelectProps & {
  title?: string;
  width?: number;
  placeholder?: string;
};

export function SelectBox({
  title,
  width,
  placeholder,
  onOpenChange,
  ...props
}: Props): ReactElement {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function onOpenChangeHandler(isOpen: boolean): undefined {
    setIsSelectOpen(isOpen);
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }

  function onCloseHandler(e: Event): undefined {
    e.preventDefault();
  }

  const defaultValues = {
    width: 210,
  };

  return (
    <div className={'flex flex-col'}>
      {title && (
        <span className={'regular-text-14 text-light-900'}>{title}</span>
      )}
      <Select.Root onOpenChange={onOpenChangeHandler} {...props}>
        <Select.Trigger
          className={cn(
            'border-dark-100 bg-dark-700 regular-text-16 flex h-[36px] cursor-pointer items-center justify-between rounded-[2px] border px-[12px]',
            'focus:outline-accent-500 focus:outline-[2px]',
            'hover:text-light-900',
            isSelectOpen && 'border-light-100 bg-dark-500 rounded-b-none'
          )}
          style={{ width: `${width || defaultValues.width}px` }}
          ref={triggerRef}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <ChevronIcon direction={isSelectOpen ? 'up' : 'down'} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Content
          className={cn(
            'bg-dark-500 border-light-100 cursor-pointer rounded-b-[2px] border',
            'border-t-0'
          )}
          style={{ width: `${width || defaultValues.width}px` }}
          position={'popper'}
          onCloseAutoFocus={onCloseHandler}
        >
          <Select.Viewport>
            <SelectItem value={'beef'}>Select-box1</SelectItem>
            <SelectItem value={'carrot'}>Select-box2</SelectItem>
            <SelectItem value={'hello'}>Select-box3</SelectItem>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  );
}

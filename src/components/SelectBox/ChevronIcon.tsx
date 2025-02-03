import { ReactElement } from 'react';
import Image from 'next/image';
import chevron from './icons/chevron-down.svg';
import { cn } from '@/utils/cn';

type Props = {
  direction?: 'up' | 'down';
};

export function ChevronIcon({ direction }: Props): ReactElement {
  const summaryClassName = direction === 'up' ? '-rotate-180' : '';

  return (
    <div className={cn('duration-500 ease-in-out', summaryClassName)}>
      <Image src={chevron} alt={'chevron'} width={24} height={24} />
    </div>
  );
}

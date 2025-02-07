import { ComponentProps, ReactElement } from 'react';
import Image from 'next/image';
import chevron from './icons/chevron-down.svg';

type Props = ComponentProps<'div'>;

export function ChevronIcon({ ...props }: Props): ReactElement {
  return (
    <div {...props}>
      <Image src={chevron} alt={'chevron'} width={24} height={24} />
    </div>
  );
}

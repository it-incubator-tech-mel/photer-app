import Link from 'next/link';
import { IconSprite } from '../icon/IconSprite';
import { ReactElement, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

export const LegalInfo = ({
  title,
  children,
  className,
}: Props): ReactElement => {
  return (
    <div className={cn('mx-auto flex max-w-[1280px] flex-col', className)}>
      {/* TODO указать ссылку на страницу регистрации */}
      <Link
        href="/"
        className="mt-[24px] flex gap-[12px] pl-[64px] max-md:pl-[15px]"
      >
        <IconSprite iconName="arrow-back-outline" />
        <span className="max-md:hidden">Back to Sign Up</span>
      </Link>
      <h1 className="h1-text mx-auto mt-[24px] max-md:mt-[-30px]">{title}</h1>
      <div className="mt-[14px] px-[97px] pb-[91px] text-center max-md:px-[15px]">
        {children}
      </div>
    </div>
  );
};

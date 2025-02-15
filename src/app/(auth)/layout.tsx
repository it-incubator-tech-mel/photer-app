import { Card } from '@/components';
import { cn } from '@/utils/cn';
import { ReactElement, ReactNode } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <Card
      className={cn(
        'align-center mt-[24px] flex w-full max-w-[378px] flex-col justify-center p-[24px]',
        'max-sm:bg-dark-900 max-sm:border-hidden'
      )}
    >
      {children}
    </Card>
  );
}

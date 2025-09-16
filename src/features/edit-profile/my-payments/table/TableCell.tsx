// TableCell.tsx
import { cn } from '@/shared/lib/cn';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const TableCell = ({ children, className }: Props): ReactNode => {
  return <td className={cn('px-4 py-2', className)}>{children}</td>;
};

export default TableCell;

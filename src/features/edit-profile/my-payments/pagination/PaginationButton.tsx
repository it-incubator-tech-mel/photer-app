import { IconSprite } from '@/shared/ui';
import React, { ReactNode } from 'react';

type Props = {
  type: 'prev' | 'next';
  page: number;
  pagesCount: number;
  onPageChange: (page: number) => void;
};

export const PaginationButton = ({
  type,
  page,
  pagesCount,
  onPageChange,
}: Props): ReactNode => {
  const handleClick = (): void => {
    if (type === 'prev' && page > 1) {
      onPageChange(page - 1);
    }
    if (type === 'next' && page < pagesCount) {
      onPageChange(page + 1);
    }
  };

  const isDisabled =
    (type === 'prev' && page === 1) || (type === 'next' && page === pagesCount);

  const iconName = type === 'next' ? 'arrow-ios-forward' : 'arrow-ios-back';

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`:focus-visible:outline-none rounded-md p-2 ${isDisabled ? 'cursor-not-allowed text-gray-600' : 'hover:bg-dark-500'}`}
    >
      <IconSprite
        iconName={iconName}
        className={`${isDisabled ? 'fill-dark-100' : 'fill-white'}`}
      />
    </button>
  );
};

import { Fragment, ReactNode } from 'react';
import { PaginationButton } from './PaginationButton';
import { preparePageNumbers } from '../../lib/myPaymentLib';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props): ReactNode => {
  const pageNumbers = preparePageNumbers(currentPage, totalPages);

  const handlePageClick = (pageNumber: number): void => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="flex">
      <PaginationButton
        type="prev"
        page={currentPage}
        pagesCount={totalPages}
        onPageChange={onPageChange}
      />
      <div className="flex space-x-1">
        {pageNumbers.map((page, index) => (
          <Fragment key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={() => handlePageClick(page)}
                className={`rounded-md px-3 py-2 ${
                  page === currentPage
                    ? 'text-dark-900 bg-white font-semibold'
                    : 'hover:bg-dark-500'
                }`}
              >
                {page}
              </button>
            ) : (
              <span className="px-3 py-2">...</span>
            )}
          </Fragment>
        ))}
      </div>
      <PaginationButton
        type="next"
        page={currentPage}
        pagesCount={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

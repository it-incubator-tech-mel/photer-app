import { ReactNode, useEffect, useState } from 'react';
import { PaymentTable } from './table/PaymentTable';
import { Pagination } from './pagination/Pagination';
import { useGetMyPaymentsQuery } from '../api/profileApi';
import { SelectPageItems } from './pagination/SelectPageItems';

export const MyPayments = (): ReactNode => {
  const [paymentCounts, setPaymentCounts] = useState({
    totalCount: 100,
    pagesCount: 10,
  });
  const [pageData, setPageData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const { data, error, isLoading } = useGetMyPaymentsQuery({
    pageNumber: pageData.pageNumber,
    pageSize: pageData.pageSize,
    sortDirection: 'asc',
    sortBy: 'dateOfPayment',
  });

  useEffect(() => {
    if (data) {
      setPaymentCounts({
        totalCount: data.totalCount,
        pagesCount: data.pagesCount,
      });
    }
  }, [data]);

  const handlePageChange = (newPage: number): void => {
    setPageData((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newSize: number): void => {
    setPageData((prev) => ({ ...prev, pageSize: newSize, page: 1 }));
  };

  if (isLoading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }
  if (error) {
    return (
      <div className="flex justify-center py-20">Error loading payments</div>
    );
  }
  if (data && !data.items) {
    return <div className="flex justify-center py-20">No payments</div>;
  }

  return (
    <div className="flex flex-col gap-[30px]">
      <PaymentTable payments={data?.items || []} />
      <div className="flex">
        <Pagination
          currentPage={pageData.pageNumber}
          totalPages={paymentCounts.pagesCount}
          onPageChange={handlePageChange}
        />
        <SelectPageItems
          pageSize={pageData.pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

// TableHead.tsx
import { ReactNode } from 'react';

const headers = [
  'Date of Payment',
  'End date of subscription',
  'Price',
  'Subscription Type',
  'Payment Type',
];

export const TableHead = (): ReactNode => {
  return (
    <thead className="bg-dark-500 text-white">
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="px-4 py-2">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

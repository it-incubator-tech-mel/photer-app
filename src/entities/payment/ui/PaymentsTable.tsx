// src/entities/payment/ui/PaymentsTable.tsx
'use client';

import { Payment } from '../types/payment.types';

type Props = {
  payments: Payment[];
};

export function PaymentsTable({ payments }: Props) {
  if (payments.length === 0) {
    return <p className="text-white">Нет платежей</p>;
  }

  return (
    <div className="border-dark-300 mt-6 overflow-auto rounded border">
      <table className="min-w-full text-left text-sm text-white">
        <thead className="bg-dark-500 text-light-900">
          <tr>
            <th className="px-4 py-2">Date of Payment</th>
            <th className="px-4 py-2">End date of subscription</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Subscription Type</th>
            <th className="px-4 py-2">Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-dark-300 border-t">
              <td className="px-4 py-2">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {new Date(p.endDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">${p.price}</td>
              <td className="px-4 py-2">{p.subscriptionType}</td>
              <td className="px-4 py-2">{p.paymentType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

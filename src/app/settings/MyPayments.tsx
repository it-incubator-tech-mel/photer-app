// // src/app/settings/MyPayments.tsx
// 'use client';
// type Props = {
//   accessToken: string;
// };

// import { Payment } from '@/entities/payment/types/payment.types';
// import React, { useEffect, useState } from 'react';

// export function MyPayments({ accessToken }: Props) {
//   const [data, setData] = useState<Payment[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchPayments() {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/payments/me`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         if (!res.ok) {
//           setError('Не удалось загрузить платежи');
//           return;
//         }

//         const payments: Payment[] = await res.json();
//         setData(payments);
//       } catch {
//         setError('Не удалось загрузить платежи');
//       }
//     }
//     fetchPayments();
//   }, [accessToken]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <table className="border-light-900 w-full border text-sm">
//       <thead className="bg-dark-300">
//         <tr>
//           <th className="p-2 text-left">Date of Payment</th>
//           <th className="p-2 text-left">End date of subscription</th>
//           <th className="p-2 text-left">Price</th>
//           <th className="p-2 text-left">Subscription Type</th>
//           <th className="p-2 text-left">Payment Type</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((p) => (
//           <tr key={p.id} className="border-light-900 border-t">
//             <td className="p-2">{p.createdAt}</td>
//             <td className="p-2">{p.endDate}</td>
//             <td className="p-2">{p.price}</td>
//             <td className="p-2">{p.subscriptionType}</td>
//             <td className="p-2">{p.paymentType}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

////////////////////////////////////////

// src/app/settings/MyPayments.tsx
// 'use client';

// import React from 'react';
// import { PaymentsTable } from '@/entities/payment/ui/PaymentsTable';
// import { useGetMyPaymentsQuery } from '@/shared/api/paymentsApi';

// type Props = {
//   accessToken: string;
// };

// export function MyPayments({ accessToken }: Props) {
//   const {
//     data: payments = [],
//     error,
//     isLoading,
//   } = useGetMyPaymentsQuery(accessToken);

//   if (isLoading) return <p className="text-white">Загрузка...</p>;
//   if (error)
//     return <p className="text-red-500">Не удалось загрузить платежи</p>;

//   return <PaymentsTable payments={payments} />;
// }

////////////////////////////////////////
// src/app/settings/MyPayments.tsx
'use client';

import React from 'react';
import { PaymentsTable } from '@/entities/payment/ui/PaymentsTable';
import { useGetMyPaymentsQuery } from '@/shared/api/paymentsApi';
import { Payment } from '@/entities/payment/types/payment.types';

export function MyPayments() {
  const { data = [], error, isLoading } = useGetMyPaymentsQuery();

  console.log('[MyPayments] ⏳ Loading:', isLoading);
  console.log('[MyPayments] ❌ Error:', error);
  console.log('[MyPayments] 📦 Payments data:', data);

  if (isLoading) return <p className="text-white">Загрузка...</p>;

  if (error) {
    console.error('[MyPayments] ❌ Ошибка при получении платежей:', error);
    return <p className="text-red-500">Не удалось загрузить платежи</p>;
  }

  return <PaymentsTable payments={data as Payment[]} />;
}

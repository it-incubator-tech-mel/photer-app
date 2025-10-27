import { ReactNode } from 'react';
import TableCell from './TableCell';
import { TableHead } from './TableHead';
import { SubscriptionItem } from '../../lib/profile.types';

type Props = {
  payments: SubscriptionItem[];
};

export const PaymentTable = ({ payments }: Props): ReactNode => {
  return (
    <div className="w-full">
      <table className="w-full table-auto text-left">
        <TableHead />
        <tbody className="bg-black text-white">
          {payments.map((payment, index) => (
            <tr key={index} className="border-dark-500 border-1">
              <TableCell>{payment.dateOfPayment}</TableCell>
              <TableCell>{payment.endDateOfSubscription}</TableCell>
              <TableCell className="pr-10 text-center">
                {payment.price}
              </TableCell>
              <TableCell>{payment.subscriptionType}</TableCell>
              <TableCell>{payment.paymentType}</TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

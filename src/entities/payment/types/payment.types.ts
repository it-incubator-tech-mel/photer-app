// src/entities/payment/types/payment.types.ts
export type Payment = {
  id: string;
  createdAt: string;
  endDate: string;
  price: number;
  subscriptionType: '1 day' | '7 days' | '1 month';
  paymentType: 'Stripe' | 'PayPal';
};

// src/shared/api/paymentsApi.ts

import { Payment } from '@/entities/payment/types/payment.types';
import { baseClientApi } from './baseClientApi';

export const paymentsApi = baseClientApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyPayments: builder.query<Payment[], void>({
      query: () => ({
        url: '/payments/me',
        method: 'GET',
        credentials: 'include', // ⬅️ чтобы куки отправлялись
      }),
    }),
  }),
});

export const { useGetMyPaymentsQuery } = paymentsApi;

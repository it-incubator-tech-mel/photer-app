// src/shared/lib/baseQuery.ssr.ts

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { cookies } from 'next/headers';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const cookieHeader = cookies().toString();
    console.log('🍪 SSR Cookies:', cookieHeader); // 🔍 лог куков
    if (cookieHeader) headers.set('cookie', cookieHeader);
    return headers;
  },
});

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log('🌐 SSR fetch args:', args); // 🔍 лог запроса
  const result = await rawBaseQuery(args, api, extraOptions);
  console.log('📦 SSR fetch result:', result); // 🔍 лог ответа
  return result;
};

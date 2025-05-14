'use client';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { Mutex } from 'async-mutex';

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();


  let result = await baseQuery(args, api, extraOptions);
  const token = localStorage.getItem('accessToken');
  if (result.error && result.error.status === 401 && token) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: '/auth/refresh-token',
            method: 'POST',
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          localStorage.setItem(
            'accessToken',
            (refreshResult.data as { accessToken: string }).accessToken
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.removeItem('accessToken');
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }

  }

  return result;
};

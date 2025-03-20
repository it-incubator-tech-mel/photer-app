import { authApi } from '@/features/auth/api/authApi';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { Mutex } from 'async-mutex';
import Router from 'next/router';

// create a new mutex
const mutex = new Mutex();
const baseQuery = async (args, api, extraOptions) => {
  return fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);
};
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = (await baseQuery(
          {
            url: '/auth/refresh-token',
            method: 'POST',
          },
          api,
          extraOptions
        )) as { data: { accessToken: string } };
        if (refreshResult.data) {
          localStorage.setItem('accessToken', refreshResult.data.accessToken);
          // api.dispatch(tokenReceived(refreshResult.data));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          // await Router.push('/sign-in');
          localStorage.removeItem('accessToken');
          api.dispatch(authApi.util.resetApiState());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

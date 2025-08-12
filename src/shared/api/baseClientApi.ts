// // src/shared/api/clientApi.ts
// import { createApi } from '@reduxjs/toolkit/query/react';
// import { baseQuery } from '../lib/baseQuery.client';

// export const baseClientApi = createApi({
//   reducerPath: 'clientApi',
//   baseQuery,
//   tagTypes: ['me', 'Posts', 'ProfilePosts'],
//   endpoints: () => ({}),
// });

////////////////////////////////
// src/shared/api/baseClientApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

function getAccessTokenFromCookie() {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(/accessToken=([^;]+)/);
  return match?.[1] || null;
}

export const baseClientApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAccessTokenFromCookie();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

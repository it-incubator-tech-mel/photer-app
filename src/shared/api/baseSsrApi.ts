// src/shared/api/ssrApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../lib/baseQuery.ssr';

export const baseSsrApi = createApi({
  reducerPath: 'ssrApi',
  baseQuery,
  tagTypes: ['me', 'Posts', 'ProfilePosts'],
  endpoints: () => ({}),
});

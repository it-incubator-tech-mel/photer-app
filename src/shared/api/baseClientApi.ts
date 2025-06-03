// src/shared/api/clientApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../lib/baseQuery.client';

export const baseClientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery,
  tagTypes: ['me', 'Posts', 'ProfilePosts'],
  endpoints: () => ({}),
});

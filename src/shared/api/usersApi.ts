// src/shared/api/usersApi.ts

import { baseApi } from '@/shared/lib/baseApi';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalUsersCount: builder.query<{ totalCount: number }, void>({
      query: () => '/users/total-count',
    }),
  }),
});

export const { useGetTotalUsersCountQuery } = usersApi;
/////////////

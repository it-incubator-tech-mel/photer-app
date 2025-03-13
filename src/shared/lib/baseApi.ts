import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    return fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    })(args, api, extraOptions);
  },
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['me'],
});

// import { createApi } from '@reduxjs/toolkit/query/react';
// import { baseQueryWithReauth } from './baseQuery';

// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   baseQuery: baseQueryWithReauth,
//   endpoints: () => ({}),
//   tagTypes: ['me'],
// });

///////////////////////////////////

// // shared/lib/baseApi.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL,
//     prepareHeaders: (headers) => {
//       const token =
//         typeof window !== 'undefined'
//           ? localStorage.getItem('accessToken')
//           : null;
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ['me', 'posts', 'users'],
//   endpoints: () => ({}),
// });

//////////////////////////////////////

// shared/lib/baseApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { mockBaseQuery } from './mockBaseQuery'; // Импортируем mockBaseQuery

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: mockBaseQuery, // Используем mockBaseQuery
  tagTypes: ['me', 'posts', 'users'],
  endpoints: () => ({}),
});

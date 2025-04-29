// // shared/lib/baseQuery.ts
// import {
//   BaseQueryApi,
//   FetchArgs,
//   fetchBaseQuery,
// } from '@reduxjs/toolkit/query';
// import { Mutex } from 'async-mutex';

// const mutex = new Mutex();
// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
//   credentials: 'include',
//   prepareHeaders: (headers) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const baseQueryWithReauth = async (
//   args: string | FetchArgs,
//   api: BaseQueryApi,
//   extraOptions: {}
// ) => {
//   await mutex.waitForUnlock();
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire();
//       try {
//         const refreshResult = await baseQuery(
//           {
//             url: '/auth/refresh-token',
//             method: 'POST',
//           },
//           api,
//           extraOptions
//         );

//         if (refreshResult.data) {
//           localStorage.setItem(
//             'accessToken',
//             (refreshResult.data as { accessToken: string }).accessToken
//           );
//           result = await baseQuery(args, api, extraOptions);
//         } else {
//           localStorage.removeItem('accessToken');
//           // Очистка состояния авторизации
//           api.dispatch({ type: 'authApi/resetApiState' });
//         }
//       } finally {
//         release();
//       }
//     } else {
//       await mutex.waitForUnlock();
//       result = await baseQuery(args, api, extraOptions);
//     }
//   }

//   return result;
// };
// ////////////////////////////////////
// shared/lib/baseQuery.ts - упрощённая версия, без авторизации

import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    // Без токена
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  // Просто обычный запрос, без попыток рефреша
  return baseQuery(args, api, extraOptions);
};
// ///////////////////////////////////////////

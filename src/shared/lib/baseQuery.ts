// // src/shared/lib/baseQuery.ts

// import { authApi } from '@/features/auth/api/authApi';
// import { fetchBaseQuery } from '@reduxjs/toolkit/query';
// import type {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from '@reduxjs/toolkit/query';

// import { Mutex } from 'async-mutex';

// // create a new mutex
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
// export const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
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
//           api.dispatch(authApi.util.resetApiState());
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
// Поддержка флага ENABLE_AUTH через .env
// ставишь ENABLE_AUTH = false — и все запросы идут без авторизации
//ставишь ENABLE_AUTH = true — включается Authorization и refresh-token
// src/shared/lib/baseQuery.ts - упрощённая версия, без авторизации

import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { baseApi } from './baseApi';

const ENABLE_AUTH = process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true'; // ⬅ Включай true/false по необходимости-удаляет токен и отключает авторизацию, если ENABLE_AUTH = false

const mutex = new Mutex(); // mutex для избежания гонки при refresh-token

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    if (ENABLE_AUTH) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (!ENABLE_AUTH) {
    localStorage.removeItem('accessToken'); // очищаем при выключенной авторизации
    return baseQuery(args, api, extraOptions); // ⬅ Запросы без авторизации
  }

  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  // делает обновляет токен при 401, если ENABLE_AUTH = true
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire(); // блокируем другие refresh-запросы
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
          const newAccessToken = (refreshResult.data as { accessToken: string })
            .accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          // Повтор оригинального запроса с новым токеном
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.removeItem('accessToken');
          api.dispatch(baseApi.util.resetApiState()); // безопасный сброс store
        }
      } finally {
        release(); // обязательно освободить mutex
      }
    } else {
      // если другой поток уже делает refresh, ждём его завершения
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

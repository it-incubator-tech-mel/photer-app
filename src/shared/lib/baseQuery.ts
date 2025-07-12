// // src/shared/lib/baseQuery.ts

// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from '@reduxjs/toolkit/query';
// import { Mutex } from 'async-mutex';

// const mutex = new Mutex();

// const rawBaseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
//   credentials: 'include', // ⬅️ отправка cookie
// });

// export const baseQuery: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   // ⏳ Ждём разблокировки мьютекса, если уже идёт обновление токенов
//   await mutex.waitForUnlock();

//   let result = await rawBaseQuery(args, api, extraOptions);

//   // 🔁 Если accessToken истёк — пробуем refresh
//   if (result.error?.status === 401) {
//     // ❗ Только один поток должен выполнять refresh-token
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire();

//       try {
//         const refreshResult = await rawBaseQuery(
//           { url: '/auth/refresh-token', method: 'POST' },
//           api,
//           extraOptions
//         );

//         if (!refreshResult.error) {
//           // ✅ Повторяем исходный запрос
//           result = await rawBaseQuery(args, api, extraOptions);
//         } else {
//           console.error(
//             '[refresh-token] ❌ Ошибка при обновлении токена:',
//             refreshResult.error
//           );
//         }
//       } finally {
//         release(); // 🔓 Освобождаем мьютекс
//       }
//     } else {
//       // ⏳ Ждём, пока другой поток завершит refresh
//       await mutex.waitForUnlock();
//       result = await rawBaseQuery(args, api, extraOptions);
//     }
//   }

//   return result;
// };

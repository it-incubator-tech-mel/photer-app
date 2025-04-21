// // features/main/api/mainApi.ts
// import { Post } from '@/features/main-feed/model/post.types';
// import { baseApi } from '@/shared/lib/baseApi';

// export const mainApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getUserCount: builder.query<{ count: number }, void>({
//       query: () => '/users/count',
//       providesTags: ['users'],
//     }),
//     getLatestPosts: builder.query<{ posts: Post[] }, void>({
//       query: () => '/posts/latest', // например, вернёт 4 последних поста
//       providesTags: ['posts'],
//     }),
//   }),
// });

// export const { useGetUserCountQuery, useGetLatestPostsQuery } = mainApi;

////////////////////////////

// // features/main/api/mainApi.ts
// import { Post } from '@/features/main-feed/model/post.types';
// import { baseApi } from '@/shared/lib/baseApi';

// export const mainApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getUserCount: builder.query<{ count: number }, void>({
//       query: () => '/users/count',
//       providesTags: ['users'],
//     }),
//     getLatestPosts: builder.query<Post[], void>({
//       // 👈 тут меняем тип
//       query: () => '/posts/latest',
//       providesTags: ['posts'],
//     }),
//   }),
// });

// export const { useGetUserCountQuery, useGetLatestPostsQuery } = mainApi;

///////////////////////////////

// // features/main/api/mainApi.ts
// import { Post } from '@/features/main-feed/model/post.types';
// import { baseApi } from '@/shared/lib/baseApi';
// import { getLatestPosts } from '@/features/main-feed/api/getLatestPosts'; // 👈 импорт мок-функции

// export const mainApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getUserCount: builder.query<{ count: number }, void>({
//       query: () => '/users/count',
//       providesTags: ['users'],
//     }),

//     getLatestPosts: builder.query<Post[], void>({
//       async queryFn() {
//         try {
//           const posts = await getLatestPosts();
//           return { data: posts.slice(0, 4) }; // ✅ Только 4 последних поста
//         } catch (error) {
//           return { error: { status: 'CUSTOM_ERROR', error: String(error) } };
//         }
//       },
//       providesTags: ['posts'],
//     }),
//   }),
// });

// export const { useGetUserCountQuery, useGetLatestPostsQuery } = mainApi;

///////////////////////////////
// features/main/api/mainApi.ts

import { Post } from '@/features/main-feed/model/post.types';
import { baseApi } from '@/shared/lib/baseApi';
import { getLatestPosts } from '@/features/main-feed/api/getLatestPosts'; // 👈 импорт мок-функции
import { mockUserCount } from '@/entities/user/api/mockUserCount'; // 👈 моковый подсчёт пользователей

export const mainApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserCount: builder.query<{ count: number }, void>({
      async queryFn() {
        try {
          const count = await mockUserCount(); // 🟠 Пока мы работаем с моковыми данными
          return { data: { count } };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: String(error) } };
        }
      },
      providesTags: ['users'],
    }),

    getLatestPosts: builder.query<Post[], void>({
      async queryFn() {
        try {
          const posts = await getLatestPosts(); // 🟠 Моковые посты
          return { data: posts.slice(0, 4) }; // ✅ Только 4 последних поста
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: String(error) } };
        }
      },
      providesTags: ['posts'],
    }),
  }),
});

export const { useGetUserCountQuery, useGetLatestPostsQuery } = mainApi;

// /entities/post/api/postApi.ts

// import { baseApi } from '@/shared/lib/baseApi';
// import { Post } from '../model/types';

// export const postApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getPostById: builder.query<Post, string>({
//       query: (id) => `/posts/${id}`,
//       providesTags: ['Posts'],
//     }),
//   }),
// });

// export const { useGetPostByIdQuery } = postApi;
///////////////////
// entities/post/api/postApi.ts

// import { baseApi } from '@/shared/lib/baseApi';
// import { Post } from '../model/types';

// export const postApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getPostById: builder.query<Post, string>({
//       query: (id) => `/posts/${id}`,
//       providesTags: ['Posts'],
//     }),
//     // 👉 НОВЫЙ endpoint для профиля пользователя:
//     getUserPostsById: builder.query<Post[], string>({
//       query: (userId) => `/posts/Profile/${userId}`,
//       providesTags: ['Posts'],
//     }),
//   }),
// });

// export const { useGetPostByIdQuery, useGetUserPostsByIdQuery } = postApi;
///////////////////
// src/entities/post/api/postApi.ts

import { baseApi } from '@/shared/lib/baseApi';
import { Post } from '../model/types';

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPostById: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: ['Posts'],
    }),

    // 🔥 Новый запрос — посты пользователя
    getUserPosts: builder.query<Post[], string>({
      query: (userId) => `/posts/profile/${userId}`,
      providesTags: ['Posts'],
    }),
  }),
});

export const { useGetPostByIdQuery, useGetUserPostsQuery } = postApi;

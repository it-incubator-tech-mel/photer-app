// // shared/api/postsApi.ts
// import { Post } from '@/entities/post/model/types';
// import { baseApi } from '@/shared/lib/baseApi';

// const injectedPostsApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getPosts: builder.query<Post[], void>({
//       query: () => ({
//         url: '/api/v1/posts',
//         method: 'GET',
//       }),
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
//               { type: 'Posts', id: 'LIST' },
//             ]
//           : [{ type: 'Posts', id: 'LIST' }],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const { useGetPostsQuery } = injectedPostsApi;
// ///////////////////////////////////
// shared/api/postsApi.ts

// import { baseApi } from '@/shared/lib/baseApi';
// import { Post } from '@/entities/post/model/types';

// export const postsApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getPosts: builder.query<Post[], void>({
//       query: () => 'posts',
//       providesTags: ['Posts'],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const { useGetPostsQuery } = postsApi;
// ///////////////////////////////////////////
// src/shared/api/postsApi.ts

import { baseApi } from '@/shared/lib/baseApi';
import { Post } from '@/entities/post/model/types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts?limit=4',
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
/////////

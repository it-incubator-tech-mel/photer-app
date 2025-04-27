// shared/api/postsApi.ts
import { baseApi } from '@/shared/lib/baseApi';
import { Post } from '@/entities/post/model/types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery } = postsApi;
// ///////////////////////////////////////////

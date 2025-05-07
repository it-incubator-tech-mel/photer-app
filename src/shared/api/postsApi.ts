// src/shared/api/postsApi.ts

import { baseApi } from '@/shared/lib/baseApi';
import { Post } from '@/entities/post/model/types';

interface GetPostsResponse {
  totalCount: number;
  pagesCount: number;
  items: Post[];
}

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<GetPostsResponse, void>({
      query: () => ({ url: '/posts', method: 'GET' }),
      providesTags: ['Posts'],
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;

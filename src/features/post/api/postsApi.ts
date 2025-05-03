import { baseApi } from '@/shared/lib/baseApi';
type Post = {
  id: number;
  description: string;
  photos: string[];
  userId: number;
  createdAt: string;
  updatedAt: string;
};

type PaginatedPosts = {
  items: Post[];
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
};

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PaginatedPosts, void>({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
      providesTags: ['posts'],
    }),
    createPost: builder.mutation({
      query: (body) => {
        const cookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith('accessToken='));
        const token = cookie?.split('=')[1];

        console.log('aloalo', body);
        return {
          url: '/posts',
          method: 'POST',
          body: body,
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        };
      },
      invalidatesTags: ['posts'],
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery } = postsApi;

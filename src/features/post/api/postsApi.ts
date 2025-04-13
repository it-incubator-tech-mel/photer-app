import { baseApi } from '@/shared/lib/baseApi';
type Post = {
  id: number;
  description: string;
  photo: string[];
  userId: number;
  createdAt: string;
  updatedAt: string;
};
export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['posts'],
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery } = postsApi;

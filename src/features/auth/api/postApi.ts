import { baseApi } from '@/shared/lib/baseApi';
import { mockPosts, Post } from '@/app/profile/[id]/mockPosts';

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /posts
    getPosts: builder.query<Post[], void>({
      async queryFn() {
        return { data: mockPosts };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'post' as const, id })),
              { type: 'post', id: 'LIST' },
            ]
          : [{ type: 'post', id: 'LIST' }],
    }),

    // DELETE /posts/delete/:id
    deletePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/posts/delete/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, postId) => [
        { type: 'post', id: postId },
        { type: 'post', id: 'LIST' },
      ],
    }),
  }),
});

export const { useDeletePostMutation, useGetPostsQuery } = postApi;

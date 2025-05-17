import { baseApi } from '@/shared/lib/baseApi';
import { errorHandler } from '../lib/errorHandler';
import { PostType } from '../lib/post.types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query<PostType, number>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e) {
          errorHandler(e);
        }
      },
    }),

    updatePost: builder.mutation<void, { postId: number; description: string }>(
      {
        query: ({ postId, description }) => ({
          url: `/posts/${postId}`,
          method: 'PATCH',
          body: { description },
        }),
        invalidatesTags: ['posts'],
        // Optimistic update
        async onQueryStarted(
          { postId, description },
          { dispatch, queryFulfilled }
        ) {
          const patchResult = dispatch(
            postsApi.util.updateQueryData('getPost', postId, (draft) => {
              draft.description = description;
            })
          );
          try {
            await queryFulfilled;
          } catch (e) {
            patchResult.undo();
            errorHandler(e);
          }
        },
      }
    ),
    deletePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['posts'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e) {
          errorHandler(e);
        }
      },
    }),
  }),
});

export const { useGetPostQuery, useUpdatePostMutation ,  useDeletePostMutation} = postsApi;

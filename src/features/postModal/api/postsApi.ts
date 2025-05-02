import { baseApi } from '@/shared/lib/baseApi';
import { errorHandler } from '../lib/errorHandler';
import { Posts, PostType } from '../lib/post.types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Posts, void>({
      query: () => ({
        url: '/posts',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e) {
          errorHandler(e);
        }
      },
    }),

    getPost: builder.query<PostType, string>({
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
        // Optimistic update
        async onQueryStarted(
          { postId, description },
          { dispatch, queryFulfilled }
        ) {
          const patchResult = dispatch(
            postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
              const postToUpdate = draft.items.find((p) => p.id === postId);
              if (postToUpdate) {
                postToUpdate.description = description;
              }
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
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useUpdatePostMutation } =
  postsApi;

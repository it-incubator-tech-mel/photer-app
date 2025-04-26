import { baseApi } from '@/shared/lib/baseApi';
import { errorHandler } from '../lib/errorHandler';
import { PostType } from '../lib/post.types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostType[], void>({
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

    updatePost: builder.mutation<void, PostType>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PUT',
        body: post,
      }),
      // Optimistic update
      async onQueryStarted(post, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
            const postToUpdate = draft.find((p) => p.id === post.id);
            if (postToUpdate) {
              Object.assign(postToUpdate, post);
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
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useUpdatePostMutation } =
  postsApi;

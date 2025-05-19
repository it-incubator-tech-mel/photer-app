import { baseApi } from '@/shared/lib/baseApi';
import { errorHandler } from '../lib/errorHandler';
import { Posts, PostType } from '../lib/post.types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Posts, void>({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
      providesTags: ['posts'],
    }),

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

    createPost: builder.mutation({
      query: (body) => {
        const cookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith('accessToken='));
        const token = cookie?.split('=')[1];

        return {
          url: '/posts',
          method: 'POST',
          body: body,
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        };
      },
      invalidatesTags: ['posts'],
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

    getProfilePosts: builder.query<
      Posts,
      { profileId: string; pageNumber: number }
    >({
      query: ({ profileId, pageNumber = 1 }) =>
        `/posts/users/${profileId}?pageNumber=${pageNumber}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCacheData, responseData) => {
        currentCacheData.items.push(
          ...responseData.items.sort(
            (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
          )
        );
        currentCacheData.page = responseData.page;
        currentCacheData.pagesCount = responseData.pagesCount;
        currentCacheData.pageSize = responseData.pageSize;
        currentCacheData.totalCount = responseData.totalCount;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: 'ProfilePosts' as const,
                id,
              })),
              'ProfilePosts',
            ]
          : ['ProfilePosts'],
    }),
  }),
});

export const {
  useGetPostQuery,
  useUpdatePostMutation,
  useCreatePostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useGetProfilePostsQuery,
} = postsApi;

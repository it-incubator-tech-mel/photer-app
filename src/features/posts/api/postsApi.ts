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
      providesTags: ['Posts'],
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

    createPost: builder.mutation<PostType, FormData>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body: body,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            postsApi.util.updateQueryData(
              'getProfilePosts',
              { profileId: '', pageNumber: 0 },
              (draft) => {
                draft.items.unshift(response.data);
              }
            )
          );
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
        invalidatesTags: (result, error, { postId }) => [
          'Posts',
          { type: 'Posts', id: postId },
          { type: 'Posts', id: 'PROFILE_POSTS_LIST' },
        ],
        async onQueryStarted(
          { postId, description },
          { dispatch, queryFulfilled }
        ) {
          // Обновляем кеш отдельного поста (для модалки)
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
    deletePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, postId) => [
        'Posts',
        { type: 'Posts', id: postId },
        { type: 'Posts', id: 'PROFILE_POSTS_LIST' },
      ],
    }),

    getProfilePosts: builder.query<
      Posts,
      { profileId: string; pageNumber: number }
    >({
      query: ({ profileId, pageNumber = 1 }) =>
        `/posts/users/${profileId}?pageNumber=${pageNumber}`,
      keepUnusedDataFor: 300,
      serializeQueryArgs: ({ endpointName }) => `${endpointName}`,
      merge: (currentCacheData, responseData) => {
        const cashedPostsIds = new Set(
          currentCacheData.items.map((post) => post.id)
        );
        const filteredItems = responseData.items.filter(
          (post) => !cashedPostsIds.has(post.id)
        );

        // only if updatedAt in ISO 8601 format("2025-05-24T12:34:56Z") it possible to use localeCompare
        currentCacheData.items = [
          ...filteredItems,
          ...currentCacheData.items,
        ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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
              ...result.items.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'PROFILE_POSTS_LIST' },
            ]
          : [{ type: 'Posts', id: 'PROFILE_POSTS_LIST' }],
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
  useLazyGetProfilePostsQuery,
} = postsApi;

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

    getPost: builder.query<PostType, string>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
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
          // Инвалидируем кэш всех profile posts, чтобы они перезагрузились
          dispatch(postsApi.util.invalidateTags(['Posts']));
        } catch (e) {
          errorHandler(e);
        }
      },
    }),

    updatePost: builder.mutation<void, { postId: string; description: string }>(
      {
        query: ({ postId, description }) => ({
          url: `/posts/${postId}`,
          method: 'PATCH',
          body: { description },
        }),
        invalidatesTags: ['Posts'],
        // Simple approach: Just invalidate all post caches after successful update
        async onQueryStarted(
          { postId, description },
          { dispatch, queryFulfilled }
        ) {
          console.log('=== EDIT POST DEBUG ===', {
            postId,
            description,
            timestamp: new Date().toISOString(),
          });

          try {
            const result = await queryFulfilled;
            console.log('Post update successful');

            // Invalidate specific caches for immediate UI update
            dispatch(
              postsApi.util.invalidateTags([
                { type: 'Posts', id: postId }, // string id
                { type: 'Posts', id: 'PROFILE_POSTS_LIST' }, // profile posts list
              ])
            );

            console.log('Specific caches invalidated for immediate UI update', {
              postId,
              timestamp: new Date().toISOString(),
            });
          } catch (e) {
            console.error('Post update failed:', e);
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
      invalidatesTags: ['Posts'],
      async onQueryStarted(postId, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            postsApi.util.updateQueryData(
              'getProfilePosts',
              { profileId: '', pageNumber: 0 },
              (draft) => {
                // Безопасная проверка на существование items
                if (!draft.items || !Array.isArray(draft.items)) {
                  return;
                }
                const index = draft.items.findIndex((p) => p.id === postId);
                if (index !== -1) {
                  draft.items.splice(index, 1);
                }
              }
            )
          );
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
      keepUnusedDataFor: 300,
      serializeQueryArgs: ({ endpointName }) => `${endpointName}`,
      merge: (currentCacheData, responseData) => {
        // Безопасная проверка на существование items
        const currentItems =
          currentCacheData?.items && Array.isArray(currentCacheData.items)
            ? currentCacheData.items
            : [];
        const responseItems =
          responseData?.items && Array.isArray(responseData.items)
            ? responseData.items
            : [];

        const cashedPostsIds = new Set(currentItems.map((post) => post.id));
        const filteredItems = responseItems.filter(
          (post) => !cashedPostsIds.has(post.id)
        );

        // only if updatedAt in ISO 8601 format("2025-05-24T12:34:56Z") it possible to use localeCompare
        const mergedItems = [...filteredItems, ...currentItems].sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );

        // Возвращаем новый объект вместо изменения существующего
        return {
          ...currentCacheData,
          items: mergedItems,
          page: responseData.page,
          pagesCount: responseData.pagesCount,
          pageSize: responseData.pageSize,
          totalCount: responseData.totalCount,
        };
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result && result.items && Array.isArray(result.items)
          ? [
              ...result.items.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'PROFILE_POSTS_LIST' },
            ]
          : [{ type: 'Posts', id: 'PROFILE_POSTS_LIST' }],
    }),

    addComment: builder.mutation<
      {
        id: string;
        text: string;
        createdAt: string;
        owner: { userName: string; avatarUrl: string };
      },
      { postId: string; text: string }
    >({
      query: ({ postId, text }) => ({
        url: `/posts/${postId}/comments`,
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: 'Posts', id: postId },
        { type: 'Comments', id: postId },
      ],
      async onQueryStarted({ postId }, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          console.log('Comment added successfully for post:', postId);
        } catch (e) {
          console.error('Failed to add comment:', e);
          errorHandler(e);
        }
      },
    }),
    getPostComments: builder.query<
      {
        id: string;
        text: string;
        createdAt: string;
        owner: {
          userName: string;
          avatarUrl: string | null;
        };
      }[],
      string
    >({
      query: (postId) => ({
        url: `/posts/${postId}/comments`,
      }),
      providesTags: (result, error, postId) => [
        { type: 'Comments', id: postId },
      ],
      async onQueryStarted(postId, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          console.log('Comments fetched successfully for post:', postId);
        } catch (e) {
          console.error('Failed to fetch comments:', e);
          errorHandler(e);
        }
      },
    }),
  }),
});

// Типы для комментариев
export type CommentType = {
  id: string;
  text: string;
  createdAt: string;
  owner: {
    userName: string;
    avatarUrl: string | null;
  };
};

export const {
  useGetPostQuery,
  useUpdatePostMutation,
  useCreatePostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useGetProfilePostsQuery,
  useLazyGetProfilePostsQuery,
  useAddCommentMutation,
  useGetPostCommentsQuery,
} = postsApi;

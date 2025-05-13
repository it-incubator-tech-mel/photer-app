import { baseApi } from '@/shared/lib/baseApi';
import { PostsResponse } from '@/features/posts/types/postsApi.types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfilePosts: builder.query<
      PostsResponse,
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

export const { useGetProfilePostsQuery } = postsApi;

import { baseApi } from '@/shared/lib/baseApi';
import { PostItem } from '@/features/posts/types/postsApi.types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfilePosts: builder.query<PostItem[], { userId: string }>({
      query: ({ userId }) => `/posts/Profile/${userId}`,
      providesTags: ['ProfilePosts'],
    }),
  }),
});

export const { useLazyGetProfilePostsQuery } = postsApi;

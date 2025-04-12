import { baseApi } from '@/shared/lib/baseApi';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useCreatePostMutation } = postsApi;

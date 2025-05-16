// src/shared/api/postsApi.ts
import { errorHandler } from '@/features/postModal/lib/errorHandler';
import { PostType, PostsResponse } from '@/features/posts/types/post.types';
import { baseApi } from '@/shared/lib/baseApi';

type GetPostsResponse = {
  items: PostType[];
  totalCount: number;
  pagesCount: number;
};

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Главная страница — список постов
    getPosts: builder.query<GetPostsResponse, void>({
      query: () => ({ url: '/posts', method: 'GET' }),
      providesTags: ['Posts'],
    }),

    // Публикация нового поста
    // createPost: builder.mutation({
    //   query: (body) => {
    //     const cookie = document.cookie
    //       .split('; ')
    //       .find((row) => row.startsWith('accessToken='));
    //     const token = cookie?.split('=')[1];

    //     return {
    //       url: '/posts',
    //       method: 'POST',
    //       body,
    //       headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    //     };
    //   },
    //   invalidatesTags: ['Posts'],
    // }),
    createPost: builder.mutation<null, FormData>({
      async queryFn(body) {
        console.log('📤 Mock createPost FormData:', [...body.entries()]);
        await new Promise((res) => setTimeout(res, 1000)); // задержка 1 сек
        return { data: null }; // ✔️ valid value
      },
      invalidatesTags: ['Posts'],
    }),

    // Получение одного поста (например, для модалки)
    getPost: builder.query<PostType, number>({
      query: (id) => ({ url: `/posts/${id}` }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e) {
          errorHandler(e);
        }
      },
    }),

    // Обновление поста (описание)
    updatePost: builder.mutation<void, { postId: number; description: string }>(
      {
        query: ({ postId, description }) => ({
          url: `/posts/${postId}`,
          method: 'PATCH',
          body: { description },
        }),
        invalidatesTags: ['Posts'],
      }
    ),

    // Получение постов конкретного пользователя
    getProfilePosts: builder.query<
      PostsResponse,
      { profileId: string; pageNumber: number }
    >({
      query: ({ profileId, pageNumber = 1 }) =>
        `/posts/users/${profileId}?pageNumber=${pageNumber}`,
      providesTags: ['ProfilePosts'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useGetProfilePostsQuery,
} = postsApi;

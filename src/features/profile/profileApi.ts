import { baseApi } from '@/shared/lib/baseApi';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadAvatar: builder.mutation<{ avatarUrl: string }, FormData>({
      query: (formData) => ({
        url: '/profile/avatar',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadAvatarMutation } = profileApi;

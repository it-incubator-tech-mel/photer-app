import { baseApi } from '@/shared/lib/baseApi';

type UploadAvatarResponse = {
    fileUrl: string;
};

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadAvatar: builder.mutation<string, FormData>({
            query: (formData) => ({
                url: '/profile/avatar',
                method: 'POST',
                body: formData,
                formData: true,
            }),
            transformResponse: (response: UploadAvatarResponse) => response.fileUrl,
            invalidatesTags: ['me'],
        }),
    }),
});

export const { useUploadAvatarMutation } = profileApi; 
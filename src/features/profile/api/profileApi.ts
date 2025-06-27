import { baseApi } from '@/shared/lib/baseApi';

type UploadAvatarResponse = {
    fileUrl: string;
};

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadAvatar: builder.mutation<UploadAvatarResponse, FormData>({
            query: (formData) => ({
                url: '/profile/avatar',
                method: 'POST',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['me'],
        }),
    }),
});

export const { useUploadAvatarMutation } = profileApi; 
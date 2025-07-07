import { baseApi } from '@/shared/lib/baseApi';

type UploadAvatarResponse = {
    fileUrl: string;
};

export type Profile = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    city: string | null;
    country: string | null;
    birthDate: string | null;
    aboutMe: string | null;
    avatarUrl: string | null;
    createdAt: string;
    updatedAt: string;
};

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<Profile, void>({
            query: () => ({
                url: '/profile',
                method: 'GET',
            }),
            providesTags: ['Profile'],
        }),
        uploadAvatar: builder.mutation<string, FormData>({
            query: (formData) => ({
                url: '/profile/avatar',
                method: 'POST',
                body: formData,
                formData: true,
            }),
            transformResponse: (response: UploadAvatarResponse) => response.fileUrl,
            invalidatesTags: ['Profile'], // This will refetch profile data after upload
        }),
    }),
});

export const { useGetProfileQuery, useUploadAvatarMutation } = profileApi; 
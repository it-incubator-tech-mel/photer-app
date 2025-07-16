import { baseApi } from '@/shared/lib/baseApi';
import { ProfileGenIfo } from '../lib/profile.types';
import { ProfileGenInfoSchema } from '../general-iformation/genInfoSchema';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<ProfileGenIfo, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
    createProfileGenInfo: builder.mutation<ProfileGenIfo, ProfileGenInfoSchema>(
      {
        query: (data) => ({
          url: '/profile',
          method: 'POST',
          body: data,
        }),
      }
    ),
    updateProfileGenInfo: builder.mutation<
      ProfileGenIfo,
      { id: string; data: ProfileGenInfoSchema }
    >({
      query: ({ id, data }) => ({
        url: `/profile/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useCreateProfileGenInfoMutation,
  useUpdateProfileGenInfoMutation,
} = profileApi;

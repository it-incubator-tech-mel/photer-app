// src/entities/user/api/userApi.ts

import { baseApi } from '@/shared/lib/baseApi';

type UserProfile = {
  id: number;
  username: string;
};

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, string>({
      query: (userId) => `/users/${userId}`,
    }),
  }),
});

export const { useGetUserProfileQuery } = userApi;

// features/auth/api/authApi.ssr.ts
import { baseSsrApi } from '@/shared/api/baseSsrApi';

export const authApi = baseSsrApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<{ userId: number; email: string }, void>({
      query: () => ({
        url: '/auth/me',
        credentials: 'include',
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
  overrideExisting: false,
});

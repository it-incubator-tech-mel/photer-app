import { baseClientApi } from '@/shared/api/baseClientApi';
import { FormSchemaType } from '../forgot-password/types/forgotPasswordFormSchema';

export const authApi = baseClientApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { accessToken: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log('Login successful');
        } catch (error) {
          console.log('Login error:', error);
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApi.util.resetApiState());
        } catch (err) {
          console.error('Logout failed:', err);
        }
      },
    }),

    getMe: builder.query<{ userId: number; email: string }, void>({
      query: () => ({
        url: '/auth/me',
        credentials: 'include',
      }),
      providesTags: ['me'],
    }),

    register: builder.mutation<
      void,
      { username: string; email: string; password: string }
    >({
      query: (body) => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log('Registration successful. Check email.');
        } catch (error) {
          console.log('Registration failed:', error);
        }
      },
    }),

    passwordRecovery: builder.mutation<void, FormSchemaType>({
      query: (body) => ({
        url: '/auth/password-recovery',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg) {
        localStorage.setItem('email', arg.email);
      },
    }),

    recoveryPasswordResending: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/auth/password-recovery-resending',
        method: 'POST',
        body,
      }),
    }),

    newPassword: builder.mutation<
      void,
      { newPassword: string; recoveryCode: string }
    >({
      query: (body) => ({
        url: '/auth/new-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useRegisterMutation,
  usePasswordRecoveryMutation,
  useNewPasswordMutation,
  useRecoveryPasswordResendingMutation,
} = authApi;

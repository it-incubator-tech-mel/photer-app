import { baseApi } from '@/shared/lib/baseApi';
import { FormSchemaType } from '@/features/forgot-password/types/forgotPasswordFormSchema';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { accessToken: string },
      {
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body: body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          localStorage.setItem('accessToken', response.data.accessToken);
          //await dispatch(authApi.endpoints.getMe.initiate());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    newPassword: builder.mutation<
      void,
      { newPassword: string; recoveryCode: string }
    >({
      query: (body) => ({
        url: '/auth/new-password',
        method: 'POST',
        body: body,
      }),
    }),
    passwordRecovery: builder.mutation<void, FormSchemaType>({
      query: (body) => ({
        url: '/auth/password-recovery',
        method: 'POST',
        body: body,
      }),
      async onQueryStarted(arg) {
        localStorage.setItem('email', arg.email);
      },
    }),
    recoveryPasswordResending: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/auth/password-recovery-resending',
        method: 'POST',
        body: body,
      }),
    }),
    getMe: builder.query<{ userId: number }, void>({
      query: () => '/auth/me',
      providesTags: ['me'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        localStorage.removeItem('accessToken');
        dispatch(authApi.util.resetApiState());
      },
    }),
    register: builder.mutation<
      void,
      {
        username: string;
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: '/auth/registration',
        method: 'POST',
        body: body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log(
            'Registration successful. Check your email for confirmation.'
          );
        } catch (error) {
          // TODO: DISPATCH TOAST ERROR
          console.log('Registration failed:', error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
  useRegisterMutation,
  usePasswordRecoveryMutation,
  useNewPasswordMutation,
  useRecoveryPasswordResendingMutation,
} = authApi;

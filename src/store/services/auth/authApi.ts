import { baseApi } from '@/store/services/baseApi';
import { FormSchemaType } from '@/app/(auth)/forgot-password/forgotPasswordForm/forgotPasswordFormSchema';

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
          localStorage.setItem('access-token', response.data.accessToken);
          //await dispatch(authApi.endpoints.getMe.initiate());
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),
    passwordRecovery: builder.mutation<number | undefined, FormSchemaType>({
      query: (body) => ({
        url: '/auth/password-recovery',
        method: 'POST',
        body: body,
      }),
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const response = await queryFulfilled;
      //     localStorage.setItem('access-token', response.data.accessToken);
      //     //await dispatch(authApi.endpoints.getMe.initiate());
      //   } catch (error) {
      //     console.error(error);
      //     throw error;
      //   }
      // },
    }),
    getMe: builder.query<{ userId: number }, void>({
      query: () => '/auth/me',
      providesTags: ['me'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        localStorage.removeItem('access-token');
        dispatch(authApi.util.resetApiState());
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
  usePasswordRecoveryMutation,
} = authApi;

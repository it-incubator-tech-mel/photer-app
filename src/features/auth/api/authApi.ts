import { baseApi } from '@/shared/lib/baseApi';

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
          console.error(error);
          throw error;
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
} = authApi;

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
          localStorage.setItem('accessToken', response.data.accessToken);
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
        url: 'auth/logout',
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        localStorage.removeItem('accessToken');
        dispatch(authApi.util.resetApiState());
      },
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery, useLogoutMutation } = authApi;

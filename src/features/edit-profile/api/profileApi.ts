import { baseApi } from '@/shared/lib/baseApi';
import {
  MyPaymentsRequest,
  MyPaymentsResponse,
  GetPaymentsQuery,
  GetSubscriptionsResponse,
  PaymentSubscribtionQuery,
  PaymentSubscribtionResponse,
  ProfileGenIfo,
  UploadAvatarResponse,
} from '../lib/profile.types';
import { ProfileGenInfoSchema } from '../general-iformation/genInfoSchema';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<ProfileGenIfo, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
      providesTags: ['Profile'],
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

    getMyPayments: builder.query<MyPaymentsResponse, MyPaymentsRequest>({
      query: (params) => ({
        url: '/subscriptions/my-payments',
        method: 'GET',
        params,
      }),
      providesTags: ['Profile'], // Assuming payments are related to the profile
    }),

    createPaymentSubscription: builder.mutation<
      PaymentSubscribtionResponse,
      PaymentSubscribtionQuery
    >({
      query: (body) => ({
        url: '/subscriptions',
        method: 'POST',
        body: body,
      }),
    }),
    getMySubscriptions: builder.query<
      GetSubscriptionsResponse,
      GetPaymentsQuery
    >({
      query: (body) => ({
        url: '/subscriptions',
        method: 'GET',
        params: body,
      }),
      providesTags: [{ type: 'Profile', id: 'LIST' }],
    }),
    cancelAutoRenewal: builder.mutation<void, void>({
      query: () => ({
        url: '/subscriptions/cancel-auto-renewal',
        method: 'POST',
      }),
      invalidatesTags: [],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          profileApi.util.invalidateTags([{ type: 'Profile', id: 'LIST' }])
        );
      },
    }),
    enableAutoRenewal: builder.mutation<void, void>({
      query: () => ({
        url: '/subscriptions/enable-auto-renewal',
        method: 'POST',
      }),
      invalidatesTags: [],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          profileApi.util.invalidateTags([{ type: 'Profile', id: 'LIST' }])
        );
      },
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useCreateProfileGenInfoMutation,
  useUpdateProfileGenInfoMutation,
  useUploadAvatarMutation,
  useGetMyPaymentsQuery,
  useCreatePaymentSubscriptionMutation,
  useGetMySubscriptionsQuery,
  useCancelAutoRenewalMutation,
  useEnableAutoRenewalMutation,
} = profileApi;

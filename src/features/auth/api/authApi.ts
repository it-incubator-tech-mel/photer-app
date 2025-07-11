// // src/features/auth/api/authApi.ts
// import { baseApi } from '@/shared/lib/baseApi';
// import { FormSchemaType } from '../forgot-password/types/forgotPasswordFormSchema';

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation<
//       { accessToken: string },
//       { email: string; password: string }
//     >({
//       query: (body) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body,
//         credentials: 'include', // чтобы сохранить refreshToken после логина
//       }),
//       async onQueryStarted(arg, { queryFulfilled }) {
//         try {
//           await queryFulfilled;
//           console.log('Login successful');
//         } catch (error) {
//           console.log('Login error:', error);
//         }
//       },
//     }),

//     logout: builder.mutation<void, void>({
//       query: () => ({
//         url: '/auth/logout',
//         method: 'POST',
//         credentials: 'include', // обязательно для отправки refreshToken
//       }),
//       async onQueryStarted(_, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled;
//           dispatch(authApi.util.resetApiState()); // очистка кэша и токенов
//         } catch (err) {
//           console.error('Logout failed:', err);
//         }
//       },
//     }),

//     getMe: builder.query<{ userId: number; email: string }, void>({
//       query: () => ({
//         url: '/auth/me',
//         credentials: 'include', //  если проверка по accessToken в куках
//       }),
//       providesTags: ['me'],
//     }),

//     register: builder.mutation<
//       void,
//       { username: string; email: string; password: string }
//     >({
//       query: (body) => ({
//         url: '/auth/registration',
//         method: 'POST',
//         body,
//       }),
//       async onQueryStarted(_, { queryFulfilled }) {
//         try {
//           await queryFulfilled;
//           console.log('Registration successful. Check email.');
//         } catch (error) {
//           console.log('Registration failed:', error);
//         }
//       },
//     }),

//     passwordRecovery: builder.mutation<void, FormSchemaType>({
//       query: (body) => ({
//         url: '/auth/password-recovery',
//         method: 'POST',
//         body,
//       }),
//       async onQueryStarted(arg) {
//         localStorage.setItem('email', arg.email);
//       },
//     }),

//     recoveryPasswordResending: builder.mutation<void, { email: string }>({
//       query: (body) => ({
//         url: '/auth/password-recovery-resending',
//         method: 'POST',
//         body,
//       }),
//     }),

//     newPassword: builder.mutation<
//       void,
//       { newPassword: string; recoveryCode: string }
//     >({
//       query: (body) => ({
//         url: '/auth/new-password',
//         method: 'POST',
//         body,
//       }),
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useLogoutMutation,
//   useGetMeQuery,
//   useRegisterMutation,
//   usePasswordRecoveryMutation,
//   useNewPasswordMutation,
//   useRecoveryPasswordResendingMutation,
// } = authApi;

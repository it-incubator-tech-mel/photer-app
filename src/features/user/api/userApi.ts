// // features/user/api/userApi.ts
// import { baseApi } from '@/shared/lib/baseApi';

// export const userApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getUserCount: builder.query<number, void>({
//       query: () => '/users/count', // Замените на реальный эндпоинт
//     }),
//   }),
// });

// export const { useGetUserCountQuery } = userApi;

////////////////////////////

// features/user/api/userApi.ts
import { baseApi } from '@/shared/lib/baseApi';
import { mockUserCount } from '@/entities/user/api/mockUserCount';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserCount: builder.query<number, void>({
      async queryFn() {
        try {
          const count = await mockUserCount(); // Моковый запрос
          return { data: count }; // Возвращаем количество
        } catch (error: any) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error.message || 'Неизвестная ошибка',
            },
          };
        }
      },
    }),
  }),
});

export const { useGetUserCountQuery } = userApi;

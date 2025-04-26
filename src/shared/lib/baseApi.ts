// shared/lib/baseApi.ts

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

// Этот файл не зависит от других частей приложения.
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['me', 'Posts'],
  endpoints: () => ({}), // Эндпоинты будут подключаться через injectEndpoints
});
///////////////////////////////////

// shared/state/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';

import { authApi } from '@/features/auth/api/authApi';
import { baseApi } from '@/shared/lib/baseApi';
import { modalReducer } from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    authReducer: authApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Кастомный хук с типизацией dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

setupListeners(store.dispatch);
// ///////////////////////////////////////////

// src/shared/state/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';

import { modalReducer } from './slices/modalSlice';
import { postReducer } from '@/features/postCreate/model/postSlice';
import { authReducer } from '@/features/auth/model/authSlice';
import { baseClientApi } from '../api/baseClientApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    post: postReducer,
    [baseClientApi.reducerPath]: baseClientApi.reducer, // все endpoints подключаются сюда через injectEndpoints
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false, // отключили "тяжёлую" проверку
    }).concat(baseClientApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

setupListeners(store.dispatch);

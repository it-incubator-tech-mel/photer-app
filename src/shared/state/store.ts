// src/shared/state/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';

import { baseApi } from '@/shared/lib/baseApi';
import { modalReducer } from './slices/modalSlice';
import { postReducer } from '@/features/postCreate/model/postSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    post: postReducer,
    [baseApi.reducerPath]: baseApi.reducer, // ⬅ все endpoints подключаются сюда через injectEndpoints
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false, // <- отключили "тяжёлую" проверку
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

setupListeners(store.dispatch);

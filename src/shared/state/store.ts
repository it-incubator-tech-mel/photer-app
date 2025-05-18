import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { baseApi } from '../lib/baseApi';
import { modalReducer } from './slices/modalSlice';
import { authApi } from '@/features/auth/api/authApi';
import { postReducer } from '@/features/posts/model/postSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    authReducer: authApi.reducer,
    post: postReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

setupListeners(store.dispatch);

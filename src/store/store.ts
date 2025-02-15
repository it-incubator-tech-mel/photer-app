import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { baseApi } from '@/store/services/baseApi';
import { authApi } from '@/store/services/auth/authApi';

export const store = configureStore({
  reducer: {
    ['authApi']: authApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

setupListeners(store.dispatch);

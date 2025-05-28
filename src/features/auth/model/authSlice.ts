// src/features/auth/model/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.isAuth = false;
    },
  },
});

export const { logoutAction } = authSlice.actions;
export const authReducer = authSlice.reducer;

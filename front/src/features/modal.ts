import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { authApi } from '@@/services/auth';

export interface ModalState {}

const initialState = {} as ModalState;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });

    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, () => {
      return initialState;
    });
  },
});

export const {} = modalSlice.actions;

export default modalSlice;

import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { authApi } from '@@/services/auth';

const initialState = {
  accessToken: '',
  expiresIn: 0,
  expiresAt: Date.now(),
  refreshToken: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
    refresh(state, { payload }) {
      return {
        ...state,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        expiresIn: payload.expiresIn,
        expiresAt: Date.now() + payload.expiresIn * 1000,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.expiresIn = payload.expiresIn;
        state.expiresAt = Date.now() + state.expiresIn * 1000;
      },
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, () => {
      return initialState;
    });
  },
});

export default slice;

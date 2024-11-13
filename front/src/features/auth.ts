import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { authApi } from '@@/services/auth';
import { userApi } from '@@/services/user';

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
      (action) =>
        authApi.endpoints.login.matchFulfilled(action) ||
        userApi.endpoints.createUser.matchFulfilled(action),
      // @ts-ignore
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

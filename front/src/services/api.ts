import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { RootState } from '@@/store';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const auth = (getState() as RootState).auth;

    if (auth.accessToken) {
      headers.set('Authorization', `Bearer ${auth.accessToken}`);
    }

    return headers;
  },
});

const mutex = new Mutex();
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            method: 'POST',
            url: '/auth/refresh',
            body: {
              refreshToken: (api.getState() as RootState).auth.refreshToken,
            },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          api.dispatch({
            type: 'auth/refresh',
            payload: refreshResult.data,
          });

          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch({ type: 'auth/logout' });
        }
      } finally {
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Users',
    'Documents',
    'BridgeItems',
    'BridgeTransactions',
    'Conversations',
  ],
  endpoints: () => ({}),
});

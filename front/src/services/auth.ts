import { api } from '@@/services//api';
import { Roles } from '@@/constants/user';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<SH.SigninResult, SH.SigninInput>({
      query: (body) => ({
        url: `auth/login`,
        method: 'POST',
        body: {
          ...body,
          role: Roles.GUARDIAN,
        },
      }),
      invalidatesTags: ['Users'],
    }),
    refresh: builder.mutation<SH.SigninResult, void>({
      query: () => ({
        url: `auth/refresh`,
        method: 'POST',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `auth/logout`,
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(api.util.resetApiState());
      },
    }),
    resetPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: `auth/reset-password`,
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation<
      SH.User,
      { token: string; password: string }
    >({
      query: (body) => ({
        url: `auth/change-password`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;

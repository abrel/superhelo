import { api } from '@@/services/api';
import { convertToFormData } from '@@/utils/formData';
import { generateRandomPassword } from '@@/utils/password';
import { Roles } from '@@/constants/user';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<SH.User, void>({
      query: () => `users/me`,
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<
      SH.User & SH.SigninResult,
      Partial<SH.User> & { photo?: File }
    >({
      query: ({ photo, ...body }) => {
        const formData = new FormData();

        if (photo) {
          formData.set('file', photo);
        }

        return {
          url: '/users',
          method: 'POST',
          body: convertToFormData(body, formData),
          formData: true,
        };
      },
      invalidatesTags: ['Users'],
    }),
    patchUser: builder.mutation<SH.User, Partial<SH.User> & { photo?: File }>({
      query: ({ id, photo, ...body }) => {
        const formData = new FormData();

        if (photo) {
          formData.set('file', photo);
        }

        return {
          url: `/users/${id}`,
          method: 'PATCH',
          body: convertToFormData(body, formData),
          formData: true,
        };
      },
      invalidatesTags: ['Users'],
    }),
    handleSignature: builder.mutation<SH.User, { id: string; blob: Blob }>({
      query: ({ id, blob }) => {
        const formData = new FormData();

        if (blob) {
          formData.set('file', blob);
        }

        return {
          url: `/users/${id}/signature`,
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Users'],
    }),
    handleAvatar: builder.mutation<SH.User, { id: string; file: File }>({
      query: ({ id, file }) => {
        const formData = new FormData();

        if (file) {
          formData.set('file', file);
        }

        return {
          url: `/users/${id}/avatar`,
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Users'],
    }),
    fetchMyWards: builder.query<SH.User[], void>({
      query: () => `users/my-wards`,
      providesTags: ['Users'],
    }),
    searchWards: builder.query<SH.User[], string>({
      query: (s) => `/users/search-wards?s=${s}`,
      providesTags: ['Users'],
    }),
    createWard: builder.mutation<
      SH.User & SH.SigninResult,
      Partial<SH.User> & { photo: File }
    >({
      query: ({ photo, ...body }) => {
        const formData = new FormData();

        if (photo) {
          formData.set('file', photo);
        }

        formData.set('role', Roles.WARD);
        formData.set('password', generateRandomPassword());

        return {
          url: '/users',
          method: 'POST',
          body: convertToFormData(body, formData),
          formData: true,
        };
      },
      invalidatesTags: ['Users'],
    }),
    getUser: builder.query<SH.User, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: ['Users'],
    }),
    getUserBridgeAccounts: builder.query<SH.BridgeItem[], string>({
      query: (userId) => `/users/${userId}/items`,
      providesTags: ['BridgeItems'],
    }),
    createBridgeConnectionUrl: builder.mutation<{ url: string }, string>({
      query: (userId) => {
        return {
          url: `/users/${userId}/items`,
          method: 'POST',
          body: {},
        };
      },
      async onQueryStarted(_userId, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.url) {
            window.location.href = data.url;
          }
        } catch (error) {
          // do nothing
        }
      },
      invalidatesTags: [],
    }),
    updateBridgeConnectionUrl: builder.mutation<
      { url: string },
      { userId: string; itemId: number }
    >({
      query: ({ userId, itemId }) => {
        return {
          url: `/users/${userId}/items/${itemId}`,
          method: 'PATCH',
          body: {},
        };
      },
      async onQueryStarted(_userId, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.url) {
            window.location.href = data.url;
          }
        } catch (error) {
          // do nothing
        }
      },
      invalidatesTags: [],
    }),
    deleteBridgeItem: builder.mutation<
      void,
      { userId: string; itemId: number }
    >({
      query: ({ userId, itemId }) => {
        return {
          url: `/users/${userId}/items/${itemId}`,
          method: 'DELETE',
          body: {},
        };
      },

      invalidatesTags: ['BridgeItems'],
    }),
  }),
});

export const {
  useGetMeQuery,
  useCreateUserMutation,
  usePatchUserMutation,
  useHandleSignatureMutation,
  useHandleAvatarMutation,
  useFetchMyWardsQuery,
  useSearchWardsQuery,
  useCreateWardMutation,
  useGetUserQuery,
  useGetUserBridgeAccountsQuery,
  useCreateBridgeConnectionUrlMutation,
  useUpdateBridgeConnectionUrlMutation,
  useDeleteBridgeItemMutation,
} = userApi;

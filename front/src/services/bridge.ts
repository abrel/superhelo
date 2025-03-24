import { api } from '@@/services/api';

export const bridgeApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
    retrieveAccountTransactions: builder.query<
      SH.BridgeMongoTransaction[],
      { userId: string; accountId: string }
    >({
      query: ({ userId, accountId }) =>
        `/users/${userId}/accounts/${accountId}/transactions`,
      providesTags: ['BridgeTransactions'],
    }),
    retrieveFinancialMetrics: builder.query<any, string>({
      query: (userId) => `/users/${userId}/financial-metrics`,
      providesTags: ['BridgeItems'],
    }),
  }),
});

export const {
  useGetUserBridgeAccountsQuery,
  useCreateBridgeConnectionUrlMutation,
  useUpdateBridgeConnectionUrlMutation,
  useDeleteBridgeItemMutation,
  useRetrieveAccountTransactionsQuery,
  useRetrieveFinancialMetricsQuery,
} = bridgeApi;

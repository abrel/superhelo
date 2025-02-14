import { api } from '@@/services//api';

export const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    handleQuestion: builder.mutation<
      SH.Message[],
      { question: string; conversationId?: string }
    >({
      query: (body) => ({
        url: `conversations`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Conversations'],
    }),
    retriveConversation: builder.query<SH.Message[], string | undefined>({
      query: (conversationId) =>
        conversationId ? `/conversations/${conversationId}` : '/conversations',
      providesTags: ['Conversations'],
    }),
  }),
});

export const { useHandleQuestionMutation, useRetriveConversationQuery } =
  conversationApi;

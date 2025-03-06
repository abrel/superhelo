import { api } from '@@/services//api';
import { convertToFormData } from '@@/utils/formData';

export const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    handleQuestion: builder.mutation<
      SH.Message[],
      {
        question: string;
        conversationId?: string;
        wardId?: string;
        files?: File[];
      }
    >({
      query: ({ files, ...body }) => {
        const formData = new FormData();
        if (files) {
          for (const file of files) {
            formData.append('file', file);
          }
        }
        return {
          url: `conversations`,
          method: 'POST',
          body: convertToFormData(body, formData),
          formData: true,
        };
      },
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

import { api } from '@@/services/api';

export const documentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDocument: builder.query<SH.Document, string>({
      query: (documentId) => `documents/${documentId}`,
      providesTags: ['Documents'],
    }),
    viewDocument: builder.query<string, string>({
      query: (documentId) => ({
        url: `documents/${documentId}/view`,
        responseHandler: async (response) => {
          const contentType = response.headers.get('Content-Type');
          const blob = await response.blob();

          return URL.createObjectURL(
            contentType ? new Blob([blob], { type: contentType }) : blob,
          );
        },
      }),
    }),
    createUserDocuments: builder.mutation<
      SH.Document[],
      { userId: string; files: File[] }
    >({
      query: ({ userId, files }) => {
        const formData = new FormData();

        for (const file of files) {
          formData.append('file', file);
        }

        return {
          url: `users/${userId}/documents`,
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Documents'],
    }),
    patchDocument: builder.mutation<
      SH.Document,
      {
        documentId: string;
        isPrivate?: boolean;
        label?: string;
        type?: string;
      }
    >({
      query: ({ documentId, ...body }) => {
        return {
          url: `documents/${documentId}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['Documents'],
    }),
    deleteDocument: builder.mutation<{}, string>({
      query: (documentId) => ({
        url: `documents/${documentId}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: ['Documents'],
    }),
    getUserDocuments: builder.query<SH.Document[], string>({
      query: (userId) => `users/${userId}/documents`,
      providesTags: ['Documents'],
    }),
  }),
});

export const {
  useGetDocumentQuery,
  useViewDocumentQuery,
  useDeleteDocumentMutation,
  useCreateUserDocumentsMutation,
  useGetUserDocumentsQuery,
  usePatchDocumentMutation,
} = documentApi;

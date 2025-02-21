import * as MessageRepository from '@@/services/mongo/repositories/Message';
import * as DocumentRepository from '@@/services/mongo/repositories/Document';
import S3Manager from '@@/services/s3';

export const cleanUnusedDocuments = async () => {
  const documents = await DocumentRepository.findAllDocumentsBy({
    conversationId: { $exists: true },
    userId: { $exists: false },
  });

  for (const document of documents) {
    const messages = await MessageRepository.findAllMessagesBy({
      documentIds: document.id,
    });

    if (!messages?.length) {
      await S3Manager.deleteFile(document.key);
      await DocumentRepository.deleteDocumentById(document.id);
    }
  }
};

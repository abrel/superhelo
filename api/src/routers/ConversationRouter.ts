import { Application, Router } from 'express';
import { multipleUploadMiddleware } from '@@/controllers/UploadController';
import {
  setConversationId,
  handleQuestion,
  retrieveConversation,
} from '@@/controllers/ConversationController';
import { handleConversationDocuments } from '@@/controllers/UploadController';

export default function ConversationRouter(_app: Application): Router {
  const router = Router();

  router.post('/', [
    multipleUploadMiddleware,
    setConversationId,
    handleConversationDocuments,
    handleQuestion,
  ]);
  router.get(['/', '/:conversationId'], retrieveConversation);

  return router;
}

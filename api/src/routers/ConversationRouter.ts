import { Application, Router } from 'express';
import {
  handleQuestion,
  retrieveConversation,
} from '@@/controllers/ConversationController';

export default function ConversationRouter(_app: Application): Router {
  const router = Router();

  router.post('/', handleQuestion);
  router.get(['/', '/:conversationId'], retrieveConversation);

  return router;
}

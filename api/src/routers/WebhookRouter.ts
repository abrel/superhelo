import { Application, Router } from 'express';
import { bridgeWebhook } from '@@/controllers/WebhookController';

export default function WebhookRouter(_app: Application): Router {
  const router = Router();

  router.post('/bridge', bridgeWebhook);

  return router;
}

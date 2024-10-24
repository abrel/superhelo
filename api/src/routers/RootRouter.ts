import { Application, Router } from 'express';
import { healthCheck } from '@@/controllers/RootController';

export default function RootRouter(_app: Application): Router {
  const router = Router();

  router.get('/', healthCheck);

  return router;
}

import { Application, Router } from 'express';
import {
  login,
  logout,
  refresh,
  resetPassword,
  changePassword,
} from '@@/controllers/AuthController';

export default function AuthRouter(_app: Application): Router {
  const router = Router();

  router.post('/login', login);
  router.post('/refresh', refresh);
  router.post('/logout', logout);
  router.post('/reset-password', resetPassword);
  router.post('/change-password', changePassword);

  return router;
}

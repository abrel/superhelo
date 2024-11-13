import { Application, Router } from 'express';
import {
  checkAndExtractTokenInfo,
  maybeExtractTokenInfo,
  hasAccessToUser,
} from '@@/controllers/AccessController';
import {
  fetchMe,
  fetchUser,
  renderUser,
  createUser,
  deleteUser,
  patchUser,
  fetchMyWards,
  searchWards,
} from '@@/controllers/UserController';
import {
  singleUploadMiddleware,
  multipleUploadMiddleware,
  handleUserSignature,
  handleUserDocuments,
  handleUserAvatar,
} from '@@/controllers/UploadController';
import {
  fetchUserDocuments,
  renderDocuments,
} from '@@/controllers/DocumentController';

export default function Userouter(_app: Application): Router {
  const router = Router();
  router.post('/', [
    maybeExtractTokenInfo,
    singleUploadMiddleware,
    handleUserAvatar,
    createUser,
  ]);

  router.use(checkAndExtractTokenInfo);

  router.get('/me', [fetchMe, renderUser]);
  router.get('/my-wards', [fetchMyWards, renderUser]);
  router.get('/search-wards', [searchWards, renderUser]);

  router.param('userId', fetchUser);
  router.param('userId', hasAccessToUser);

  router.get('/:userId', renderUser);
  router.delete('/:userId', deleteUser);
  router.patch('/:userId', [
    singleUploadMiddleware,
    handleUserAvatar,
    patchUser,
    renderUser,
  ]);

  router.post('/:userId/avatar', [
    singleUploadMiddleware,
    handleUserAvatar,
    patchUser,
    renderUser,
  ]);

  router.post('/:userId/signature', [
    singleUploadMiddleware,
    handleUserSignature,
    patchUser,
    renderUser,
  ]);

  router.post('/:userId/documents', [
    multipleUploadMiddleware,
    handleUserDocuments,
    renderDocuments,
  ]);
  router.get('/:userId/documents', [fetchUserDocuments, renderDocuments]);

  return router;
}

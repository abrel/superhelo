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
  fetchBrigeItems,
  addBrigeItem,
  updateBrigeItem,
  deleteBrigeItem,
  fetchAccountTransactions,
  computeUserFinancialMetrics,
} from '@@/controllers/UserController';
import {
  singleUploadMiddleware,
  multipleUploadMiddleware,
  handleUserSignature,
  handleUserDocuments,
  handleUserAvatar,
} from '@@/controllers/UploadController';
import { handleBodyEmptyArrays } from '@@/controllers/RootController';
import {
  fetchUserDocuments,
  renderDocuments,
} from '@@/controllers/DocumentController';

export default function Userouter(_app: Application): Router {
  const router = Router();
  router.post('/', [
    maybeExtractTokenInfo,
    singleUploadMiddleware,
    handleBodyEmptyArrays,
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
    handleBodyEmptyArrays,
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

  router.get('/:userId/items', fetchBrigeItems);
  router.post('/:userId/items', addBrigeItem);
  router.patch('/:userId/items/:itemId', updateBrigeItem);
  router.delete('/:userId/items/:itemId', deleteBrigeItem);

  router.get(
    '/:userId/accounts/:accountId/transactions',
    fetchAccountTransactions,
  );

  router.get('/:userId/financial-metrics', computeUserFinancialMetrics);

  return router;
}

import { Application, Router } from 'express';
import {
  maybeExtractTokenInfo,
  hasAccessToDocument,
} from '@@/controllers/AccessController';
import {
  fetchDocument,
  renderDocuments,
  deleteDocument,
  viewDocument,
  patchDocument,
} from '@@/controllers/DocumentController';

export default function DocumentRouter(_app: Application): Router {
  const router = Router();
  router.use(maybeExtractTokenInfo);
  router.param('documentId', fetchDocument);
  router.param('documentId', hasAccessToDocument);

  router.get('/:documentId', renderDocuments);
  router.get('/:documentId/view', viewDocument);
  router.get('/:documentId/:convervationId/view', [
    hasAccessToDocument,
    viewDocument,
  ]);
  router.delete('/:documentId', deleteDocument);
  router.patch('/:documentId', [patchDocument, renderDocuments]);

  return router;
}

import '@@/config';
import '@@/instrument';
import express, { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import bodyParser from 'body-parser';
import WebhookRouter from '@@/routers/WebhookRouter';
import RootRouter from '@@/routers/RootRouter';
import AuthRouter from '@@/routers/AuthRouter';
import UserRouter from '@@/routers/UserRouter';
import DocumentRouter from '@@/routers/DocumentRouter';
import ConversationRouter from '@@/routers/ConversationRouter';
import { initSH } from '@@/controllers/RootController';
import HttpError from '@@/utils/HttpError';

const app = express();

app.set('trust proxy', true);
app.use(cors({ origin: '*' }));

app.use(initSH);

app.use('/webhooks', [
  bodyParser.raw({ type: 'application/json' }),
  WebhookRouter(app),
]);

app.use(bodyParser.json());
app.use('/', RootRouter(app));
app.use('/auth', AuthRouter(app));
app.use('/users', UserRouter(app));
app.use('/documents', DocumentRouter(app));
app.use('/conversations', ConversationRouter(app));

Sentry.setupExpressErrorHandler(app);
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  console.dir(err, { depth: undefined });
  return res.status(err.status || 500).json(err);
});

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[API]-[${process.env.ENV}]: Service is running at http://localhost:${process.env.PORT}`,
  );
});

export default app;

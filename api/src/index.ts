import '@@/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import RootRouter from '@@/routers/RootRouter';
import HttpError from '@@/utils/httpError';

const app = express();
app.set('trust proxy', true);

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.use('/', RootRouter(app));

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

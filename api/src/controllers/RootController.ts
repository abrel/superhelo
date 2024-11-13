import { Request, Response, NextFunction } from 'express';
import MongoManager from '@@/services/mongo';

export const initSH = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.sh) {
    req.sh = {};
  }
  return next();
};

export const healthCheck = async (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  return res.json({
    env: process.env.ENV,
    uptime: process.uptime(),
    sha1: process.env.SHA1 || process.env.ENV,
    mongo: await MongoManager.healthCheck(),
  });
};

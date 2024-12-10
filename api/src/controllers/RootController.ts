import { Request, Response, NextFunction } from 'express';
import MongoManager from '@@/services/mongo';

export const initSH = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.sh) {
    req.sh = {};
  }
  return next();
};

const transformEmptyArrays = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformEmptyArrays);
  } else if (obj && typeof obj === 'object') {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        acc[key] = value === '[]' ? [] : transformEmptyArrays(value);
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
};

export const handleBodyEmptyArrays = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (req.body && typeof req.body === 'object') {
    req.body = transformEmptyArrays(req.body);
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

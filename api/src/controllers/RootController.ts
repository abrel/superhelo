import { Request, Response, NextFunction } from 'express';

export const healthCheck = async (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  return res.json({
    env: process.env.ENV,
    uptime: process.uptime(),
    sha1: process.env.SHA1 || process.env.ENV,
  });
};

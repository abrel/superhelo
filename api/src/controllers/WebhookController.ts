import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const bridgeWebhook = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const xForwardedFor = req.headers['x-forwarded-for'];
  console.log({ xForwardedFor });
  //63.32.31.5
  //52.215.247.62
  //34.249.92.209

  console.dir(req.body, { depth: undefined });

  const hash = crypto
    .createHmac('SHA256', process.env.BRIDGE_WEBHOOK_SECRET)
    .update(req.body)
    .digest('hex');

  console.log(hash.toUpperCase());

  return res.json({});
};

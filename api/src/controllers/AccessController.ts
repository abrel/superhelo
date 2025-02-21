import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@@/services/jwt';
import { Roles } from '@@/constants/user';
import HttpError from '@@/utils/HttpError';

export const checkAndExtractTokenInfo = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    if (req.headers.authorization) {
      req.sh.verifiedToken = verifyToken(
        req.headers.authorization?.slice(7),
      ) as SH.JWTData;
    }

    if (req.query.token) {
      req.sh.verifiedToken = verifyToken(
        req.query.token as string,
      ) as SH.JWTData;
    }

    if (!req.sh.verifiedToken?.id) {
      throw new HttpError('You must be authenticated', 403);
    }

    return next();
  } catch (e) {
    return next(e);
  }
};

export const maybeExtractTokenInfo = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    if (req.headers.authorization) {
      req.sh.verifiedToken = verifyToken(
        req.headers.authorization?.slice(7),
      ) as SH.JWTData;
    }

    return next();
  } catch (e) {
    return next();
  }
};

export const isAdmin = (req: Request, _res: Response, next: NextFunction) => {
  if (req.sh?.verifiedToken?.role === Roles.ADMIN) {
    return next();
  }

  return next(new HttpError('You must have admin role', 403));
};

export const hasAccessToUser = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (String(req.sh.user?.id) === String(req.sh.verifiedToken?.id)) {
    return next();
  }

  switch (req.sh.verifiedToken?.role) {
    case Roles.ADMIN: {
      return next();
    }

    case Roles.GUARDIAN: {
      switch (req.sh.user?.role) {
        case Roles.ADMIN:
        case Roles.GUARDIAN: {
          return next(new HttpError('UNAUTHORIZED', 403));
        }

        default: {
          if (
            String(req.sh.user?.guardianId) === String(req.sh.verifiedToken?.id)
          ) {
            return next();
          }
        }
      }
    }

    default: {
      return next(new HttpError('UNAUTHORIZED', 403));
    }
  }
};

export const hasAccessToDocument = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  switch (req.sh.verifiedToken?.role) {
    case Roles.ADMIN: {
      return next();
    }

    case Roles.GUARDIAN: {
      if (
        String(req.sh.document?.createdBy) === String(req.sh.verifiedToken?.id)
      ) {
        return next();
      }

      break;
    }

    default: {
      if (
        String(req.sh.document?.userId) === String(req.sh.verifiedToken?.id)
      ) {
        return next();
      }

      if (
        !req.sh.document?.userId &&
        req.sh.document?.conversationId === req.params.conversationId
      ) {
        return next();
      }

      return next(new HttpError('UNAUTHORIZED', 403));
    }
  }
};

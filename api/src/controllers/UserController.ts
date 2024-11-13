import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import omit from 'lodash.omit';
import { createToken, createRefreshToken, tokenTTL } from '@@/services/jwt';
import * as UserRepository from '@@/services/mongo/repositories/User';
import validator from '@@/validation/validator';
import {
  createhUserValidationSchema,
  patchUserValidationSchema,
  searchValidationSchema,
} from '@@/validation/schemas';
import { Roles } from '@@/constants/user';
import HttpError from '@@/utils/HttpError';
import { formatName } from '@@/utils/string';

export const fetchMe = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.sh.user = await UserRepository.findUserByIdOrThrow(
      req.sh.verifiedToken?.id!,
    );

    return next();
  } catch (e) {
    return next(e);
  }
};

export const fetchMyWards = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.sh.users = await UserRepository.findUsersBy({
      guardianId: req.sh.verifiedToken?.id,
    });

    return next();
  } catch (e) {
    return next(e);
  }
};

export const fetchUser = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.sh.user = await UserRepository.findUserByIdOrThrow(req.params.userId);

    return next();
  } catch (e) {
    return next(e);
  }
};

export const renderUser = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => res.json(req.sh.users || req.sh.user);

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = validator(req.body, createhUserValidationSchema) as SH.User & {
      password: string;
    };

    if (data.role === Roles.WARD && !req.sh.verifiedToken?.id) {
      throw new HttpError('You must be logged to create a ward', 403);
    }

    if (
      data.role === Roles.WARD &&
      req.sh.verifiedToken?.role !== Roles.GUARDIAN
    ) {
      throw new HttpError('You must be a guardian to create a ward', 403);
    }

    const user = await UserRepository.createUser({
      ...data,
      firstName: formatName(data.firstName),
      lastName: formatName(data.lastName),
      password: data.password && bcrypt.hashSync(data.password, 10),
      guardianId:
        data.role === Roles.WARD ? req.sh.verifiedToken?.id : undefined,
    });

    const userData = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    return res.json({
      ...omit(user.toJSON(), ['password']),
      accessToken: createToken(userData),
      expiresIn: tokenTTL,
      refreshToken: createRefreshToken(userData),
    });
  } catch (e) {
    return next(e);
  }
};

export const deleteUser = async (
  req: Express.Request,
  res: Response,
  next: NextFunction,
) => {
  const { user } = req.sh;

  if (!user) {
    return next(new HttpError('user not found', 404));
  }

  return res.json(
    await UserRepository.updateUserById(
      user._id,
      { isDeleted: true },
      { requesterId: req.sh?.verifiedToken?.id },
    ),
  );
};

export const patchUser = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.sh.user) {
      throw new Error('User not found');
    }

    const data = validator(req.body, patchUserValidationSchema) as SH.User & {
      password?: string;
    };

    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }

    if (data.firstName) {
      data.firstName = formatName(data.firstName);
    }

    if (data.lastName) {
      data.lastName = formatName(data.lastName);
    }

    if (req.sh.user.photoDocumentId) {
      data.photoDocumentId = req.sh.user.photoDocumentId;
    }

    if (req.sh.user.signatureDocumentId) {
      data.signatureDocumentId = req.sh.user.signatureDocumentId;
    }

    req.sh.user = await UserRepository.updateUserById(req.sh.user._id, data, {
      requesterId: req.sh?.verifiedToken?.id,
    });

    return next();
  } catch (e) {
    if ((e as any).code === 11000) {
      return next(new HttpError(`${req.body.email} already exists`, 409));
    }
    return next(e);
  }
};

export const searchWards = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    let { s } = validator(req.query, searchValidationSchema) as {
      s: string;
    };

    const users = await UserRepository.findUsersBy({
      $or: [
        {
          firstName: { $regex: s, $options: 'i' },
        },
        {
          lastName: { $regex: s, $options: 'i' },
        },
      ],
      role: Roles.WARD,
      guardianId: req.sh.verifiedToken?.id,
    });

    req.sh.users = users;

    return next();
  } catch (e) {
    return next(e);
  }
};

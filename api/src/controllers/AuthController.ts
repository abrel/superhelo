import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import SQSManager from '@@/services/sqs';
import validator from '@@/validation/validator';
import {
  loginValidationSchema,
  refreshTokenValidationSchema,
  resetPasswordValidationSchema,
  changePasswordValidationSchema,
} from '@@/validation/schemas';
import HttpError from '@@/utils/HttpError';
import * as UserRepository from '@@/services/mongo/repositories/User';
import {
  createToken,
  createRefreshToken,
  tokenTTL,
  verifyRefreshToken,
  verifyChangePasswordToken,
} from '@@/services/jwt';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = validator(req.body, loginValidationSchema) as {
      email: string;
      password: string;
      role: string;
    };

    const user = await UserRepository.findOneUserBy(
      {
        email: data.email,
        role: data.role,
      },
      ['password'],
    );

    if (!user || user.isDeleted) {
      throw new HttpError(`User with email ${data.email} is not found`, 403);
    }

    if (!user.password || !bcrypt.compareSync(data.password, user.password)) {
      throw new HttpError('Password does not match', 403);
    }

    const userData = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    return res.json({
      accessToken: createToken(userData),
      expiresIn: tokenTTL,
      refreshToken: createRefreshToken(userData),
      role: user.role,
    });
  } catch (e) {
    return next(e);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = validator(req.body, refreshTokenValidationSchema) as {
      refreshToken: string;
    };

    const verifiedToken = verifyRefreshToken(data.refreshToken) as SH.JWTData;

    const user = await UserRepository.findUserById(verifiedToken.id);
    if (!user) {
      throw new HttpError(`User with id ${verifiedToken.id} is not found`, 401);
    }

    if (user.isDeleted) {
      throw new HttpError(`User with id ${verifiedToken.id} is deleted`, 401);
    }

    const userData = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    return res.json({
      accessToken: createToken(userData),
      expiresIn: tokenTTL,
      refreshToken: data.refreshToken,
      role: user.role,
    });
  } catch (e) {
    return next(e);
  }
};

export const logout = async (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  return res.json({});
};
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, role } = validator(
      req.body,
      resetPasswordValidationSchema,
    ) as {
      email: string;
      role: string;
    };

    const user = await UserRepository.findOneUserBy({ email, role }, [
      'password',
    ]);

    if (!user || user.isDeleted) {
      throw new HttpError(`User with email *${email}* is not found`, 404);
    }

    await SQSManager.sendMessage({
      queue: 'sendResetPasswordEmail',
      messageBody: JSON.stringify({ user: user.toObject() }),
    });

    return res.json({});
  } catch (e) {
    return next(e);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token, password } = validator(
      req.body,
      changePasswordValidationSchema,
    ) as {
      token: string;
      password: string;
    };

    const verifiedToken = verifyChangePasswordToken(token) as SH.JWTData;
    const user = await UserRepository.findUserByIdOrThrow(verifiedToken.id);
    if (user.isDeleted) {
      throw new HttpError(`User with id ${verifiedToken.id} is not found`, 403);
    }

    user.password = bcrypt.hashSync(password, 10);

    return res.json(await user.save());
  } catch (e) {
    return next(e);
  }
};

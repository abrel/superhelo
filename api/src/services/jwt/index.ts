import jwt from 'jsonwebtoken';
import HttpError from '@@/utils/HttpError';

export const tokenTTL = 60 * 60;

export const createToken = (data: Record<string, unknown>) =>
  jwt.sign(data, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: tokenTTL,
  });

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  } catch (e) {
    throw new HttpError((e as { message: string }).message, 401);
  }
};

export const createRefreshToken = (data: Record<string, unknown>) =>
  jwt.sign(data, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '1y' });

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
  } catch (e) {
    throw new HttpError((e as { message: string }).message, 401);
  }
};

export const createChangePasswordToken = (data: Record<string, unknown>) =>
  jwt.sign(data, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: 10 * 60,
  });

export const verifyChangePasswordToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  } catch (e) {
    throw new HttpError((e as { message: string }).message, 401);
  }
};

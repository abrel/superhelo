import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import omit from 'lodash.omit';
import { createToken, createRefreshToken, tokenTTL } from '@@/services/jwt';
import * as UserRepository from '@@/services/mongo/repositories/User';
import * as BridgeItemRepository from '@@/services/mongo/repositories/BridgeItem';
import * as BridgeAccountRepository from '@@/services/mongo/repositories/BridgeAccount';
import * as BridgeTransactionRepository from '@@/services/mongo/repositories/BridgeTransaction';
import BridgeService from '@@/services/bridge';
import validator from '@@/validation/validator';
import {
  createhUserValidationSchema,
  patchUserValidationSchema,
  searchValidationSchema,
} from '@@/validation/schemas';
import { Roles } from '@@/constants/user';
import providers from '@@/constants/providers';
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

export const fetchBrigeItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const [items, accounts] = await Promise.all([
      BridgeItemRepository.findBridgeItemsBy({
        userId: req.params.userId,
      }),
      BridgeAccountRepository.findBridgeAccountsBy({
        userId: req.params.userId,
      }),
    ]);

    return res.json(
      items.map((item) => {
        const itemJSON = item.toObject();

        itemJSON.accounts = accounts.filter(
          (a) => a.item_id === itemJSON.item_id,
        );

        const provider = providers.find((p) => p.id === itemJSON.provider_id);
        itemJSON.provider_name = provider?.name;
        itemJSON.provider_logo = provider?.images?.logo;
        return itemJSON;
      }),
    );
  } catch (e) {
    return next(e);
  }
};

export const addBrigeItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.json(await BridgeService.generateConnectUrl(req.params.userId));
  } catch (e) {
    return next(e);
  }
};

export const updateBrigeItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.json(
      await BridgeService.manageConnectUrl({
        userId: req.params.userId,
        itemId: req.params.itemId,
      }),
    );
  } catch (e) {
    return next(e);
  }
};

export const deleteBrigeItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.json(
      await BridgeService.deleteUserItem({
        userId: req.params.userId,
        itemId: req.params.itemId,
      }),
    );
  } catch (e) {
    return next(e);
  }
};

export const fetchAccountTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.json(
      await BridgeTransactionRepository.findBridgeTransactionsBy({
        userId: req.params.userId,
        account_id: req.params.accountId,
      }),
    );
  } catch (e) {
    return next(e);
  }
};

export const computeUserFinancialMetrics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const [balance, metrics] = await Promise.all([
      BridgeAccountRepository.computeUserAccountBalance(req.params.userId),
      BridgeTransactionRepository.computeUserMontlhyMetrics(req.params.userId),
    ]);

    const last3MonthsMetrics = metrics
      .filter((m) => m._id !== moment().format('YYYY-MM'))
      .slice(0, 3)
      .reduce(
        (acc, cur) => {
          acc.income += cur.totalCredits / 3;
          acc.expenses += cur.totalExpenses / 3;
          return acc;
        },
        { income: 0, expenses: 0 },
      );

    return res.json({ balance, ...last3MonthsMetrics });
  } catch (e) {
    return next(e);
  }
};

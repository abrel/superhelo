import MongoManager from '@@/services/mongo';
import { Types } from 'mongoose';
import { selectableBridgeAccountFields } from '@@/services/mongo/schemas/BridgeAccount';
import { AccountTypes } from '@@/constants/bridge';
import HttpError from '@@/utils/HttpError';

export const findBridgeAccountById = (id: string, extra?: string[]) => {
  const selectableFields = extra
    ? selectableBridgeAccountFields.concat(extra)
    : selectableBridgeAccountFields;

  if (!id) {
    throw new HttpError('BridgeAccount id is required', 400);
  }

  return MongoManager.getModels()
    .BridgeAccount.findOne({ _id: id })
    .select(selectableFields);
};

export const findBridgeAccountByIdOrThrow = async (
  id: string,
  extra?: string[],
) => {
  const BridgeAccount = await findBridgeAccountById(id, extra);

  if (!BridgeAccount) {
    throw new HttpError(`BridgeAccount not found with id: ${id}`, 404);
  }

  return BridgeAccount;
};

export const findOneBridgeAccountBy = (
  where: Record<string, unknown>,
  extra?: string[],
) => {
  const selectableFields = extra
    ? selectableBridgeAccountFields.concat(extra)
    : selectableBridgeAccountFields;

  return MongoManager.getModels()
    .BridgeAccount.findOne(where)
    .select(selectableFields);
};

export const findOneBridgeAccountByOrThrow = async (
  where: Record<string, unknown>,
  extra?: string[],
) => {
  const BridgeAccount = await findOneBridgeAccountBy(where, extra);

  if (!BridgeAccount) {
    throw new HttpError('BridgeAccount not found', 404);
  }

  return BridgeAccount;
};

export const findBridgeAccountsBy = async (where: Record<string, unknown>) => {
  return MongoManager.getModels()
    .BridgeAccount.find(where)
    .sort({ balance: -1 })
    .select(selectableBridgeAccountFields) as Promise<Bridge.MongoAccount[]>;
};

export const createBridgeAccount = (data: Partial<Bridge.MongoAccount>) =>
  MongoManager.getModels().BridgeAccount.create(data);

export const updateBridgeAccountById = async (
  id: string,
  payload: Record<string, unknown>,
  meta?: Record<string, unknown>,
) => {
  const newBridgeAccount =
    (await MongoManager.getModels().BridgeAccount.findOneAndUpdate(
      { _id: id },
      payload,
      {
        fields: selectableBridgeAccountFields,
        new: true,
        ...meta,
      },
    )) as Bridge.MongoAccount;

  return newBridgeAccount;
};

export const CreateOrUpdateBridgeAccount = async (
  data: Partial<Bridge.MongoAccount> & { account_id: string },
) => {
  const existingBridgeAccount = await findOneBridgeAccountBy({
    account_id: data.account_id,
  });

  if (existingBridgeAccount) {
    return updateBridgeAccountById(existingBridgeAccount._id, data);
  }

  return MongoManager.getModels().BridgeAccount.create(data);
};

export const deleteBridgeAccountByItemId = (itemId: string) =>
  MongoManager.getModels().BridgeAccount.deleteOne({ item_id: itemId });

export const computeUserAccountBalance = async (userId: string) => {
  const balance = await MongoManager.getModels().BridgeAccount.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(userId),
        type: { $ne: AccountTypes.LOAN },
      },
    },
    {
      $group: {
        _id: 'balance',
        count: { $sum: 1 },
        sum: { $sum: '$balance' },
      },
    },
  ]);

  return balance?.[0]?.sum;
};

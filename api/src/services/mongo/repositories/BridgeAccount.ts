import MongoManager from '@@/services/mongo';
import { Types } from 'mongoose';
import { selectableBridgeAccountFields } from '@@/services/mongo/schemas/BridgeAccount';
import HttpError from '@@/utils/HttpError';

export const findAllBridgeAccountsBy = async (
  where: Record<string, unknown>,
  extra?: string[],
) => {
  const selectableFields = extra
    ? selectableBridgeAccountFields.concat(extra)
    : selectableBridgeAccountFields;

  return MongoManager.getModels()
    .BridgeAccount.find(where)
    .sort({ bridgeaccountCreationDate: 1, createdAt: 1 })
    .select(selectableFields);
};

export const createBridgeAccount = (data: Partial<Bridge.UserAccount>) =>
  MongoManager.getModels().BridgeAccount.create(data);

export const findBridgeAccountByUserId = (userId: string, extra?: string[]) => {
  const selectableFields = extra
    ? selectableBridgeAccountFields.concat(extra)
    : selectableBridgeAccountFields;

  if (!Types.ObjectId.isValid(userId)) {
    throw new HttpError(`Invalid id: ${userId}`, 400);
  }

  return MongoManager.getModels()
    .BridgeAccount.findOne({ userId })
    .select(selectableFields);
};

export const findBridgeAccountByUserIdOrThrow = async (
  userId: string,
  extra?: string[],
) => {
  const bridgeaccount = await findBridgeAccountByUserId(userId, extra);

  if (!bridgeaccount) {
    throw new HttpError(`BridgeAccount not found with id: ${userId}`, 404);
  }

  return bridgeaccount as Bridge.UserAccount;
};

export const deleteBridgeAccountById = (id: string) =>
  MongoManager.getModels().BridgeAccount.deleteOne({ _id: id });

export const updateBridgeAccountById = async (
  id: string,
  payload: Record<string, unknown>,
  ignorePayloadFields?: boolean,
) => {
  const newBridgeAccount =
    (await MongoManager.getModels().BridgeAccount.findOneAndUpdate(
      { _id: id },
      payload,
      {
        fields: ignorePayloadFields
          ? selectableBridgeAccountFields
          : selectableBridgeAccountFields.concat(Object.keys(payload)),
        new: true,
      },
    )) as Bridge.UserAccount;

  return newBridgeAccount;
};

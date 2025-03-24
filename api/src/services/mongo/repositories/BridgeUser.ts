import MongoManager from '@@/services/mongo';
import { Types } from 'mongoose';
import { selectableBridgeUserFields } from '@@/services/mongo/schemas/BridgeUser';
import HttpError from '@@/utils/HttpError';

export const findAllBridgeUsersBy = async (
  where: Record<string, unknown>,
  extra?: string[],
) => {
  const selectableFields = extra
    ? selectableBridgeUserFields.concat(extra)
    : selectableBridgeUserFields;

  return MongoManager.getModels()
    .BridgeUser.find(where)
    .sort({ bridgeuserCreationDate: 1, createdAt: 1 })
    .select(selectableFields);
};

export const createBridgeUser = (data: Partial<Bridge.User>) =>
  MongoManager.getModels().BridgeUser.create(data);

export const findBridgeUserByUserId = (userId: string, extra?: string[]) => {
  const selectableFields = extra
    ? selectableBridgeUserFields.concat(extra)
    : selectableBridgeUserFields;

  if (!Types.ObjectId.isValid(userId)) {
    throw new HttpError(`Invalid id: ${userId}`, 400);
  }

  return MongoManager.getModels()
    .BridgeUser.findOne({ userId })
    .select(selectableFields);
};

export const findBridgeUserByUserIdOrThrow = async (
  userId: string,
  extra?: string[],
) => {
  const bridgeuser = await findBridgeUserByUserId(userId, extra);

  if (!bridgeuser) {
    throw new HttpError(`BridgeUser not found with id: ${userId}`, 404);
  }

  return bridgeuser as Bridge.User;
};

export const deleteBridgeUserById = (id: string) =>
  MongoManager.getModels().BridgeUser.deleteOne({ _id: id });

export const updateBridgeUserById = async (
  id: string,
  payload: Record<string, unknown>,
  ignorePayloadFields?: boolean,
) => {
  const newBridgeUser =
    (await MongoManager.getModels().BridgeUser.findOneAndUpdate(
      { _id: id },
      payload,
      {
        fields: ignorePayloadFields
          ? selectableBridgeUserFields
          : selectableBridgeUserFields.concat(Object.keys(payload)),
        new: true,
      },
    )) as Bridge.User;

  return newBridgeUser;
};

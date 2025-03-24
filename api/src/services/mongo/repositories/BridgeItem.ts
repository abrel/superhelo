import MongoManager from '@@/services/mongo';
import { selectableBridgeItemFields } from '@@/services/mongo/schemas/BridgeItem';
import HttpError from '@@/utils/HttpError';

export const findBridgeItemById = (id: string, extra?: string[]) => {
  const selectableFields = extra
    ? selectableBridgeItemFields.concat(extra)
    : selectableBridgeItemFields;

  if (!id) {
    throw new HttpError('BridgeItem id is required', 400);
  }

  return MongoManager.getModels()
    .BridgeItem.findOne({ _id: id })
    .select(selectableFields);
};

export const findBridgeItemByIdOrThrow = async (
  id: string,
  extra?: string[],
) => {
  const BridgeItem = await findBridgeItemById(id, extra);

  if (!BridgeItem) {
    throw new HttpError(`BridgeItem not found with id: ${id}`, 404);
  }

  return BridgeItem;
};

export const findOneBridgeItemBy = (
  where: Record<string, unknown>,
  extra?: string[],
) => {
  const selectableFields = extra
    ? selectableBridgeItemFields.concat(extra)
    : selectableBridgeItemFields;

  return MongoManager.getModels()
    .BridgeItem.findOne(where)
    .select(selectableFields);
};

export const findOneBridgeItemByOrThrow = async (
  where: Record<string, unknown>,
  extra?: string[],
) => {
  const BridgeItem = await findOneBridgeItemBy(where, extra);

  if (!BridgeItem) {
    throw new HttpError('BridgeItem not found', 404);
  }

  return BridgeItem;
};

export const findBridgeItemsBy = async (where: Record<string, unknown>) => {
  return MongoManager.getModels()
    .BridgeItem.find(where)
    .select(selectableBridgeItemFields) as Promise<Bridge.MongoItem[]>;
};

export const createBridgeItem = (data: Partial<Bridge.MongoItem>) =>
  MongoManager.getModels().BridgeItem.create(data);

export const updateBridgeItemById = async (
  id: string,
  payload: Record<string, unknown>,
  meta?: Record<string, unknown>,
) => {
  const newBridgeItem =
    (await MongoManager.getModels().BridgeItem.findOneAndUpdate(
      { _id: id },
      payload,
      {
        fields: selectableBridgeItemFields,
        new: true,
        ...meta,
      },
    )) as Bridge.MongoItem;

  return newBridgeItem;
};

export const createOrUpdateBridgeItem = async (
  data: Partial<Bridge.MongoItem> & { item_id: string },
) => {
  const existingBridgeItem = await findOneBridgeItemBy({
    item_id: data.item_id,
  });

  if (existingBridgeItem) {
    return updateBridgeItemById(existingBridgeItem._id, data);
  }

  return MongoManager.getModels().BridgeItem.create(data);
};

export const deleteBridgeItemById = (id: string) =>
  MongoManager.getModels().Document.deleteOne({ _id: id });

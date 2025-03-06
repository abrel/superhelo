import MongoManager from '@@/services/mongo';
import { selectableBridgeTransactionFields } from '@@/services/mongo/schemas/BridgeTransaction';
import HttpError from '@@/utils/HttpError';

export const findBridgeTransactionById = (id: string, extra?: string[]) => {
  const selectableFields = extra
    ? selectableBridgeTransactionFields.concat(extra)
    : selectableBridgeTransactionFields;

  if (!id) {
    throw new HttpError('BridgeTransaction id is required', 400);
  }

  return MongoManager.getModels()
    .BridgeTransaction.findOne({ _id: id })
    .select(selectableFields);
};

export const findBridgeTransactionByIdOrThrow = async (
  id: string,
  extra?: string[],
) => {
  const BridgeTransaction = await findBridgeTransactionById(id, extra);

  if (!BridgeTransaction) {
    throw new HttpError(`BridgeTransaction not found with id: ${id}`, 404);
  }

  return BridgeTransaction;
};

export const findOneBridgeTransactionBy = (
  where: Record<string, unknown>,
  extra?: string[],
) => {
  const selectableFields = extra
    ? selectableBridgeTransactionFields.concat(extra)
    : selectableBridgeTransactionFields;

  return MongoManager.getModels()
    .BridgeTransaction.findOne(where)
    .select(selectableFields);
};

export const findOneBridgeTransactionByOrThrow = async (
  where: Record<string, unknown>,
  extra?: string[],
) => {
  const BridgeTransaction = await findOneBridgeTransactionBy(where, extra);

  if (!BridgeTransaction) {
    throw new HttpError('BridgeTransaction not found', 404);
  }

  return BridgeTransaction;
};

export const findBridgeTransactionsBy = async (
  where: Record<string, unknown>,
) => {
  return MongoManager.getModels()
    .BridgeTransaction.find({
      ...where,
      deleted: false,
    })
    .sort({ date: -1 })
    .select(selectableBridgeTransactionFields) as Promise<
    Bridge.MongoTransaction[]
  >;
};

export const createBridgeTransaction = (
  data: Partial<Bridge.MongoTransaction>,
) => MongoManager.getModels().BridgeTransaction.create(data);

export const updateBridgeTransactionById = async (
  id: string,
  payload: Record<string, unknown>,
  meta?: Record<string, unknown>,
) => {
  const newBridgeTransaction =
    (await MongoManager.getModels().BridgeTransaction.findOneAndUpdate(
      { _id: id },
      payload,
      {
        fields: selectableBridgeTransactionFields,
        new: true,
        ...meta,
      },
    )) as Bridge.MongoTransaction;

  return newBridgeTransaction;
};

export const CreateOrUpdateBridgeTransaction = async (
  data: Partial<Bridge.MongoTransaction> & { transaction_id: string },
) => {
  const existingBridgeTransaction = await findOneBridgeTransactionBy({
    transaction_id: data.transaction_id,
  });

  if (existingBridgeTransaction) {
    return updateBridgeTransactionById(existingBridgeTransaction._id, data);
  }

  return MongoManager.getModels().BridgeTransaction.create(data);
};

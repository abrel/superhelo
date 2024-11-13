import MongoManager from '@@/services/mongo';
import { selectableUserFields } from '@@/services/mongo/schemas/User';
import HttpError from '@@/utils/HttpError';

export const findUserById = (id: string, extra?: string[]) => {
  const selectableFields = extra
    ? selectableUserFields.concat(extra)
    : selectableUserFields;

  if (!id) {
    throw new HttpError('User id is required', 400);
  }

  return MongoManager.getModels()
    .User.findOne({ _id: id, isDeleted: false })
    .select(selectableFields);
};

export const findUserByIdOrThrow = async (id: string, extra?: string[]) => {
  const user = await findUserById(id, extra);

  if (!user) {
    throw new HttpError(`User not found with id: ${id}`, 404);
  }

  return user;
};

export const findOneUserBy = (
  where: Record<string, unknown>,
  extra?: string[],
) => {
  const selectableFields = extra
    ? selectableUserFields.concat(extra)
    : selectableUserFields;

  return MongoManager.getModels()
    .User.findOne({ ...where, isDeleted: false })
    .select(selectableFields);
};

export const findOneUserByOrThrow = async (
  where: Record<string, unknown>,
  extra?: string[],
) => {
  const user = await findOneUserBy(where, extra);

  if (!user) {
    throw new HttpError('User not found', 404);
  }

  return user;
};

export const findUsersBy = async (where: Record<string, unknown>) => {
  return MongoManager.getModels()
    .User.find({
      ...where,
      isDeleted: false,
    })
    .select(selectableUserFields);
};

export const createUser = (data: Partial<SH.User>) =>
  MongoManager.getModels().User.create(data);

export const findOrCreateUser = async (
  data: Partial<SH.User> & { email: string },
) => {
  const existingUser = await findOneUserBy({
    email: data.email,
  });

  if (existingUser) {
    return existingUser;
  }

  return MongoManager.getModels().User.create(data);
};

export const updateUserById = async (
  id: string,
  payload: Record<string, unknown>,
  meta: Record<string, unknown>,
) => {
  const newUser = (await MongoManager.getModels().User.findOneAndUpdate(
    { _id: id },
    payload,
    {
      fields: selectableUserFields,
      new: true,
      ...meta,
    },
  )) as SH.User;

  return newUser;
};

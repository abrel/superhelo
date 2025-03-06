import MongoManager from '@@/services/mongo';
import { Types } from 'mongoose';
import { selectableDocumentFields } from '@@/services/mongo/schemas/Document';
import HttpError from '@@/utils/HttpError';

export const findAllDocumentsBy = async (
  where: Record<string, unknown>,
  extra?: string[],
) => {
  const selectableFields = extra
    ? selectableDocumentFields.concat(extra)
    : selectableDocumentFields;

  return MongoManager.getModels()
    .Document.find(where)
    .sort({ documentCreationDate: 1, createdAt: 1 })
    .select(selectableFields) as Promise<SH.Document[]>;
};

export const createDocument = (data: Partial<SH.Document>) =>
  MongoManager.getModels().Document.create(data);

export const findDocumentById = (id: string, extra?: string[]) => {
  const selectableFields = extra
    ? selectableDocumentFields.concat(extra)
    : selectableDocumentFields;

  if (!Types.ObjectId.isValid(id)) {
    throw new HttpError(`Invalid id: ${id}`, 400);
  }

  return MongoManager.getModels()
    .Document.findById(id)
    .populate(['userId'])
    .select(selectableFields);
};

export const findDocumentByIdOrThrow = async (id: string, extra?: string[]) => {
  const document = await findDocumentById(id, extra);

  if (!document) {
    throw new HttpError(`Document not found with id: ${id}`, 404);
  }

  return document as SH.Document;
};

export const deleteDocumentById = (id: string) =>
  MongoManager.getModels().Document.deleteOne({ _id: id });

export const updateDocumentById = async (
  id: string,
  payload: Record<string, unknown>,
  ignorePayloadFields?: boolean,
) => {
  const newDocument = (await MongoManager.getModels().Document.findOneAndUpdate(
    { _id: id },
    payload,
    {
      fields: ignorePayloadFields
        ? selectableDocumentFields
        : selectableDocumentFields.concat(Object.keys(payload)),
      new: true,
    },
  )) as SH.Document;

  return newDocument;
};

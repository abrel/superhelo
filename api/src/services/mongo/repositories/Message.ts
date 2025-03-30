import MongoManager from '@@/services/mongo';
import { selectableMessageFields } from '@@/services/mongo/schemas/Message';

export const findAllMessagesBy = async (
  where: Record<string, unknown>,
  extra?: string[],
) => {
  const selectableFields = extra
    ? selectableMessageFields.concat(extra)
    : selectableMessageFields;

  return MongoManager.getModels()
    .Message.find(where)
    .populate(['documentIds'])
    .sort({ createdAt: 1 })
    .select(selectableFields);
};

export const createMessage = (data: Partial<AI.Message>) =>
  MongoManager.getModels().Message.create(data);

export const findMessageByMessageId = (messageId: string, extra?: string[]) => {
  const selectableFields = extra
    ? selectableMessageFields.concat(extra)
    : selectableMessageFields;

  return MongoManager.getModels()
    .Message.findOne({ messageId })
    .select(selectableFields);
};

export const updateMessageByMessageId = async (
  messageId: string,
  payload: Record<string, unknown>,
  ignorePayloadFields?: boolean,
) => {
  const newMessage = (await MongoManager.getModels().Message.findOneAndUpdate(
    { messageId },
    payload,
    {
      fields: ignorePayloadFields
        ? selectableMessageFields
        : selectableMessageFields.concat(Object.keys(payload)),
      new: true,
    },
  )) as AI.Message;

  return newMessage;
};

export const findOrCreateMessage = async (
  data: Partial<AI.Message> & { messageId: string },
) => {
  const message = await findMessageByMessageId(data.messageId);

  if (message) {
    return message;
  }

  return createMessage(data);
};

export const deleteMessageById = (id: string) =>
  MongoManager.getModels().Message.deleteOne({ _id: id });

export const retrieveConversationsForWards = async (wardIds: string[]) => {
  return MongoManager.getModels().Message.aggregate([
    { $match: { userId: { $in: wardIds } } },
    {
      $lookup: {
        from: 'documents',
        localField: 'documentIds',
        foreignField: '_id',
        as: 'documents',
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: '$conversationId',
        firstMessage: { $last: '$$ROOT' },
        lastMessage: { $first: '$$ROOT' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'firstMessage.userId',
        foreignField: '_id',
        as: 'ward',
      },
    },
    { $unwind: '$ward' },
  ]);
};

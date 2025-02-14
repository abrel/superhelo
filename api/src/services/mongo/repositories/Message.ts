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

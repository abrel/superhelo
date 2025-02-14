const { Types } = require('mongoose');

declare namespace AI {
  export type Message = {
    _id: Types.ObjectId;
    id: string;
    messageId: string;
    conversationId: string;
    type: string;
    content: string;

    userId?: Types.ObjectId;

    createdAt?: Date;
    updatedAt?: Date;

    save: () => Promise<Message>;
    __v?: number;
  };
}

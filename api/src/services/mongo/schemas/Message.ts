import { Schema, SchemaType, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MessageTypes } from '@@/constants/message';

const messageSchema = new Schema<AI.Message>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    messageId: {
      type: Schema.Types.String,
      required: true,
    },
    conversationId: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      required: true,
      enum: MessageTypes,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    __v: {
      type: Schema.Types.Number,
      select: false,
    },
  },
  {
    collection: 'messages',
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
    toObject: {
      virtuals: true,
      versionKey: false,
    },
  },
);

messageSchema.index({ userId: 1 });
messageSchema.index({ conversationId: 1 });
messageSchema.index({ messageId: 1 }, { unique: true });
messageSchema.plugin(mongoosePaginate);

export const selectableMessageFields = Object.entries(messageSchema.paths)
  .filter((entry: [string, SchemaType]) => entry[1].options.select !== false)
  .map((entry) => entry[0]);

export default messageSchema;

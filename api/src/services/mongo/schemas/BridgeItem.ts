import { Schema, SchemaType, Types } from 'mongoose';

const bridgeItemSchema = new Schema<Bridge.MongoItem>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    item_id: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.Number,
      required: true,
    },
    status_code_info: {
      type: Schema.Types.String,
      required: true,
    },
    status_code_description: {
      type: Schema.Types.String,
      required: false,
    },
    provider_id: {
      type: Schema.Types.Number,
      required: true,
    },
    account_types: {
      type: Schema.Types.String,
      required: true,
    },
    last_successful_refresh: {
      type: Schema.Types.Date,
      required: true,
    },
    last_try_refresh: {
      type: Schema.Types.Date,
      required: true,
    },
    created_at: {
      type: Schema.Types.Date,
      required: true,
    },
    __v: {
      type: Schema.Types.Number,
      select: false,
    },
  },
  {
    collection: 'bridge-items',
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

bridgeItemSchema.index({ item_id: 1 }, { unique: true });
bridgeItemSchema.index({ userId: 1 });

export const selectableBridgeItemFields = Object.entries(bridgeItemSchema.paths)
  .filter((entry: [string, SchemaType]) => entry[1].options.select !== false)
  .map((entry) => entry[0]);

export default bridgeItemSchema;

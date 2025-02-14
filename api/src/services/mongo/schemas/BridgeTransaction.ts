import { Schema, SchemaType, Types } from 'mongoose';

const bridgeTransactionSchema = new Schema<Bridge.MongoTransaction>(
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
    transaction_id: {
      type: Schema.Types.String,
      required: true,
    },
    clean_description: {
      type: Schema.Types.String,
      required: true,
    },
    provider_description: {
      type: Schema.Types.String,
      required: true,
    },
    amount: {
      type: Schema.Types.Number,
      required: true,
    },
    date: {
      type: Schema.Types.String,
      required: true,
    },
    booking_date: {
      type: Schema.Types.String,
      required: false,
    },
    transaction_date: {
      type: Schema.Types.String,
      required: false,
    },
    value_date: {
      type: Schema.Types.String,
      required: false,
    },
    updated_at: {
      type: Schema.Types.Date,
      required: true,
    },
    currency_code: {
      type: Schema.Types.String,
      required: true,
    },
    deleted: {
      type: Schema.Types.Boolean,
      required: true,
    },
    category_id: {
      type: Schema.Types.Number,
      required: true,
    },
    category_name: {
      type: Schema.Types.String,
      required: false,
    },
    subcategory_name: {
      type: Schema.Types.String,
      required: false,
    },
    operation_type: {
      type: Schema.Types.String,
      required: false,
    },
    account_id: {
      type: Schema.Types.String,
      required: true,
    },
    future: {
      type: Schema.Types.Boolean,
      required: true,
    },
    __v: {
      type: Schema.Types.Number,
      select: false,
    },
  },
  {
    collection: 'bridge-transactions',
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

bridgeTransactionSchema.index({ transaction_id: 1 }, { unique: true });
bridgeTransactionSchema.index({ userId: 1 });
bridgeTransactionSchema.index({ account_id: 1 });
bridgeTransactionSchema.index({ deleted: 1 });
bridgeTransactionSchema.index({ date: 1 });

export const selectableBridgeTransactionFields = Object.entries(
  bridgeTransactionSchema.paths,
)
  .filter((entry: [string, SchemaType]) => entry[1].options.select !== false)
  .map((entry) => entry[0]);

export default bridgeTransactionSchema;

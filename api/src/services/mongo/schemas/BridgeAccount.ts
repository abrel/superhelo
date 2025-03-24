import { Schema, SchemaType, Types } from 'mongoose';

const loanSchema = new Schema<Bridge.Loan>(
  {
    next_payment_date: {
      type: Schema.Types.String,
      required: true,
    },
    next_payment_amount: {
      type: Schema.Types.Number,
      required: true,
    },
    maturity_date: {
      type: Schema.Types.String,
      required: true,
    },
    opening_date: {
      type: Schema.Types.String,
      required: true,
    },

    interest_rate: {
      type: Schema.Types.Number,
      required: true,
    },
    borrowed_capital: {
      type: Schema.Types.Number,
      required: true,
    },
    repaid_capital: {
      type: Schema.Types.Number,
      required: true,
    },
    remaining_capital: {
      type: Schema.Types.Number,
      required: true,
    },
    total_estimated_interests: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const bridgeAccountSchema = new Schema<Bridge.MongoAccount>(
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
      ref: 'BridgeItem',
    },
    account_id: {
      type: Schema.Types.String,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    balance: {
      type: Schema.Types.Number,
      required: true,
    },
    accounting_balance: {
      type: Schema.Types.Number,
      required: false,
    },
    instant_balance: {
      type: Schema.Types.Number,
      required: false,
    },
    updated_at: {
      type: Schema.Types.Date,
      required: true,
    },
    last_refresh_status: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      required: true,
    },
    currency_code: {
      type: Schema.Types.String,
      required: true,
    },
    provider_id: {
      type: Schema.Types.Number,
      required: true,
    },
    data_access: {
      type: Schema.Types.String,
      required: true,
    },
    pro: {
      type: Schema.Types.Boolean,
      required: true,
    },
    iban: {
      type: Schema.Types.String,
      required: false,
    },
    loan_details: {
      type: loanSchema,
      required: false,
    },
    __v: {
      type: Schema.Types.Number,
      select: false,
    },
  },
  {
    collection: 'bridge-accounts',
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

bridgeAccountSchema.index({ account_id: 1 }, { unique: true });
bridgeAccountSchema.index({ userId: 1 });
bridgeAccountSchema.index({ item_id: 1 });

export const selectableBridgeAccountFields = Object.entries(
  bridgeAccountSchema.paths,
)
  .filter((entry: [string, SchemaType]) => entry[1].options.select !== false)
  .map((entry) => entry[0]);

export default bridgeAccountSchema;

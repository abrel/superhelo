import { Schema, SchemaType, Types } from 'mongoose';

const bridgeAccountSchema = new Schema<SH.BridgeUserAccount>(
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
    uuid: {
      type: Schema.Types.String,
      required: true,
    },
    accessToken: {
      type: Schema.Types.String,
      required: false,
    },
    accessTokenExpiresAt: {
      type: Schema.Types.Date,
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

bridgeAccountSchema.index({ userId: 1 });

export const selectableBridgeAccountFields = Object.entries(
  bridgeAccountSchema.paths,
)
  .filter((entry: [string, SchemaType]) => entry[1].options.select !== false)
  .map((entry) => entry[0]);

export default bridgeAccountSchema;

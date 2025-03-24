import { Schema, SchemaType, Types } from 'mongoose';

const bridgeUserSchema = new Schema<Bridge.User>(
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
    collection: 'bridge-users',
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

bridgeUserSchema.index({ userId: 1 });

export const selectableBridgeUserFields = Object.entries(bridgeUserSchema.paths)
  .filter((entry: [string, SchemaType]) => entry[1].options.select !== false)
  .map((entry) => entry[0]);

export default bridgeUserSchema;

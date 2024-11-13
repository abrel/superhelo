import { Schema, SchemaType, Types } from 'mongoose';
import { Roles, Genders, MaritalStatuses } from '@@/constants/user';

const contactSchema = new Schema<SH.Contact>(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    phone: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<SH.User>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    phone: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      enum: Roles,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      select: false,
    },
    photoDocumentId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Document',
    },
    signatureDocumentId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Document',
    },
    guardianId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    gender: {
      type: Schema.Types.String,
      enum: Genders,
      required: false,
    },
    nationality: {
      type: Schema.Types.String,
      required: false,
    },
    address: {
      type: Schema.Types.String,
      required: false,
    },
    city: {
      type: Schema.Types.String,
      required: false,
    },
    postcode: {
      type: Schema.Types.String,
      required: false,
    },
    country: {
      type: Schema.Types.String,
      required: false,
    },
    birthDate: {
      type: Schema.Types.Date,
      required: false,
    },
    cityOfBirth: {
      type: Schema.Types.String,
      required: false,
    },
    nationalInsuranceNumber: {
      type: Schema.Types.String,
      required: false,
    },
    taxIndentificationNumber: {
      type: Schema.Types.String,
      required: false,
    },
    gir: {
      type: Schema.Types.String,
      required: false,
    },
    maritalStatus: {
      type: Schema.Types.String,
      enum: MaritalStatuses,
      required: false,
    },
    children: {
      type: Schema.Types.Number,
      required: false,
    },
    religion: {
      type: Schema.Types.String,
      required: false,
    },
    alone: {
      type: Schema.Types.Boolean,
      required: false,
    },
    pets: {
      type: Schema.Types.Boolean,
      required: false,
    },
    trustedContacts: {
      type: [contactSchema],
      required: false,
    },
    isDeleted: {
      type: Schema.Types.Boolean,
      default: false,
    },
    __v: {
      type: Schema.Types.Number,
      select: false,
    },
  },
  {
    collection: 'users',
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

userSchema.index(
  { email: 1, role: 1 },
  { unique: true, partialFilterExpression: { isDeleted: { $eq: false } } },
);
userSchema.index(
  { phone: 1, role: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: { $eq: false },
    },
  },
);

userSchema.index({ isDeleted: 1 });

userSchema.virtual('id').get(function id(this: { _id: string }) {
  return this._id.toString();
});

export const selectableUserFields = Object.entries(userSchema.paths)
  .filter((entry: [string, SchemaType]) => entry[1].options.select !== false)
  .map((entry) => entry[0]);

export default userSchema;

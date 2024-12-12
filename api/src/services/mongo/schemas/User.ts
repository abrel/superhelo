import { Schema, SchemaType, Types } from 'mongoose';
import { Roles, Genders, MaritalStatuses } from '@@/constants/user';
import { MeasureTypes } from '@@/constants/measure';

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

export const attendeeSchema = new Schema<SH.Attendee>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      required: false,
    },
  },
  { _id: false },
);

export const courtSchema = new Schema<SH.Court>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    service: {
      type: Schema.Types.String,
      required: false,
    },
    address: {
      type: Schema.Types.String,
      required: false,
    },
    postcode: {
      type: Schema.Types.String,
      required: false,
    },
    city: {
      type: Schema.Types.String,
      required: false,
    },
    country: {
      type: Schema.Types.String,
      required: false,
    },
    phone: {
      type: Schema.Types.String,
      required: false,
    },
    fax: {
      type: Schema.Types.String,
      required: false,
    },
  },
  { _id: false },
);

export const judgmentSchema = new Schema<SH.Judgment>(
  {
    date: {
      type: Schema.Types.Date,
      required: false,
    },
    court: {
      type: courtSchema,
    },
    attendees: {
      type: [attendeeSchema],
    },
  },
  { _id: false },
);
export const measureSchema = new Schema<SH.Measure>(
  {
    type: {
      type: Schema.Types.String,
      enum: MeasureTypes,
      required: true,
    },
    motive: {
      type: Schema.Types.String,
      required: false,
    },
    startDate: {
      type: Schema.Types.Date,
      required: true,
    },
    endDate: {
      type: Schema.Types.Date,
    },
    judgment: {
      type: judgmentSchema,
    },
    documentIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: 'Document',
    },
  },
  {
    _id: false,
  },
);

export const deductionSchema = new Schema<SH.Deduction>(
  {
    label: {
      type: Schema.Types.String,
      required: true,
    },
    value: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

export const realEstatePropertySchema = new Schema<SH.RealEstateProperty>(
  {
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
    value: {
      type: Schema.Types.Number,
      required: false,
    },
    floorArea: {
      type: Schema.Types.Number,
      required: false,
    },
    landArea: {
      type: Schema.Types.Number,
      required: false,
    },
    purchaseDate: {
      type: Schema.Types.Date,
      required: false,
    },
    saleDate: {
      type: Schema.Types.Date,
      required: false,
    },
    deductions: {
      type: [deductionSchema],
      required: false,
    },
    documentIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: 'Document',
    },
  },
  {
    _id: false,
  },
);

export const personalPropertySchema = new Schema<SH.PersonalProperty>(
  {
    label: {
      type: Schema.Types.String,
      required: true,
    },
    value: {
      type: Schema.Types.Number,
      required: true,
    },
    documentIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: 'Document',
    },
  },
  {
    _id: false,
  },
);

export const scheduleItemSchema = new Schema<SH.ScheduleItem>(
  {
    date: {
      type: Schema.Types.Date,
      required: true,
    },
    amortization: {
      type: Schema.Types.Number,
      required: true,
    },
    interest: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

export const debtSchema = new Schema<SH.Debt>(
  {
    label: {
      type: Schema.Types.String,
      required: true,
    },
    amount: {
      type: Schema.Types.Number,
      required: true,
    },
    schedule: {
      type: [scheduleItemSchema],
      required: false,
    },
    documentIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: 'Document',
    },
  },
  {
    _id: false,
  },
);

export const PasswordSchema = new Schema<SH.PasswordItem>(
  {
    label: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: false,
    },
    value: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { _id: false },
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
    measures: {
      type: [measureSchema],
      required: false,
    },
    realEstateProperties: {
      type: [realEstatePropertySchema],
      required: false,
    },
    personalProperties: {
      type: [personalPropertySchema],
      required: false,
    },
    debts: {
      type: [debtSchema],
      required: false,
    },
    passwords: {
      type: [PasswordSchema],
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

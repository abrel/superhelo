import { Schema, SchemaType, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { DocumentTypes } from '@@/constants/document';

const documentSchema = new Schema<SH.Document>(
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
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    label: {
      type: Schema.Types.String,
      required: false,
    },
    type: {
      type: Schema.Types.String,
      enum: DocumentTypes,
    },
    key: {
      type: Schema.Types.String,
      required: true,
    },
    mimetype: {
      type: Schema.Types.String,
      required: true,
    },
    isPrivate: {
      type: Schema.Types.Boolean,
      required: false,
      default: false,
    },
    __v: {
      type: Schema.Types.Number,
      select: false,
    },
  },
  {
    collection: 'documents',
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

documentSchema.index({ userId: 1 });
documentSchema.index({ createdBy: 1 });
documentSchema.index({ key: 1 });
documentSchema.plugin(mongoosePaginate);

export const selectableDocumentFields = Object.entries(documentSchema.paths)
  .filter((entry: [string, SchemaType]) => entry[1].options.select !== false)
  .map((entry) => entry[0]);

export default documentSchema;

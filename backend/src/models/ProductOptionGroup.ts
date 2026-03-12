import { Schema, model, Document, Types } from 'mongoose';

type ProductOptionGroupDb = {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  required: boolean;
  minSelected?: number;
  maxSelected?: number;
  values: Array<{
    id: string;
    label: string;
    description?: string;
    image?: {
      src: string;
      alt?: string;
    };
    extraPrice?: {
      amount: number;
      currency: 'UAH';
    };
    components?: Array<{
      name: string;
      image: {
        src: string;
        alt?: string;
      };
    }>;
  }>;
};

export type ProductOptionGroupDocument = Document &
  ProductOptionGroupDb & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };

const ImageSchema = new Schema(
  {
    src: { type: String, required: true },
    alt: { type: String },
  },
  { _id: false },
);

const ProductComponentSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: ImageSchema, required: true },
  },
  { _id: false },
);

const PriceSchema = new Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, enum: ['UAH'], default: 'UAH' },
  },
  { _id: false },
);

const ProductOptionValueSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String },
    image: { type: ImageSchema },
    extraPrice: { type: PriceSchema },
    components: { type: [ProductComponentSchema], default: [] },
  },
  { _id: false },
);

const ProductOptionGroupSchema = new Schema<ProductOptionGroupDocument>(
  {
    id: {
      type: String,
      index: true,
      unique: true,
      default: function (this: ProductOptionGroupDocument) {
        return this._id.toString();
      },
    },
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ['single', 'multiple'], required: true },
    required: { type: Boolean, default: false },
    minSelected: { type: Number },
    maxSelected: { type: Number },
    values: { type: [ProductOptionValueSchema], default: [] },
  },
  {
    timestamps: true,
    collection: 'productOptionGroups',
  },
);

export const ProductOptionGroupModel = model<ProductOptionGroupDocument>(
  'ProductOptionGroup',
  ProductOptionGroupSchema,
);

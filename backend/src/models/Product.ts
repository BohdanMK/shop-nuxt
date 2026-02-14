// backend/src/models/Product.ts
import mongoose, { Schema, model, Document, Types } from 'mongoose';
import type { ProductDTO } from '../dtos/product.dto';

export type ProductDocument = Document &
    Omit<ProductDTO, 'categoryId' | 'subCategoryId'> & {
    categoryId?: Types.ObjectId;
    subCategoryId?: Types.ObjectId;
};



const ImageSchema = new Schema(
  {
    src: { type: String, required: true },
    alt: { type: String }
  },
  { _id: false }
);

const ProductComponentSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: ImageSchema, required: true }
  },
  { _id: false }
);

const PriceSchema = new Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, enum: ['UAH'], default: 'UAH' }
  },
  { _id: false }
);

const ProductOptionValueSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    description: String,
    image: ImageSchema,
    extraPrice: PriceSchema,
    components: [ProductComponentSchema]
  },
  { _id: false }
);

const ProductOptionGroupSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['single', 'multiple'], required: true },
    required: { type: Boolean, default: false },
    minSelected: Number,
    maxSelected: Number,
    values: { type: [ProductOptionValueSchema], default: [] }
  },
  { _id: false }
);

// ─── Основна схема продукту ──────────────────────────────────────

const ProductSchema = new Schema<ProductDocument>(
  {
    // "людське" id з фронта (philadelphia-salmon і т.д.)
    id: { type: String },

    title: { type: String, required: true },
    image: { type: ImageSchema, required: true },

    isOnSale: { type: Boolean, default: false },
    salePrice: { type: Number },

    weightGrams: { type: Number, required: true },

    components: { type: [ProductComponentSchema], default: [] },

    price: { type: PriceSchema, required: true },

    ctaLabel: { type: String },

    optionGroups: { type: [ProductOptionGroupSchema], default: [] },

    // у базі в нас тут ObjectId (бо імпортували з $oid)
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    categoryName: { type: String },

    subCategoryId: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    subCategoryName: { type: String }
  },
  {
    timestamps: true
  }
);

export const ProductModel = model<ProductDocument>('Product', ProductSchema);

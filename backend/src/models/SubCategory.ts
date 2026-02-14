import { Schema, model, Document, Types } from 'mongoose';
import type { ISubCategoriesDTO } from '../dtos/subCategories';

type SubCategoryDb = Omit<ISubCategoriesDTO, 'parentCategory'> & {
  parentCategory: Types.ObjectId;
};

export type SubCategoryDocument = Document & SubCategoryDb;

const SubCategorySchema = new Schema<SubCategoryDocument>(
  {
    id: { type: String },
    title: { type: String, required: true },
    pathName: { type: String, required: true },


    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'subCategories',
  }
);

export const SubCategoryModel = model<SubCategoryDocument>(
  'SubCategory',
  SubCategorySchema
);

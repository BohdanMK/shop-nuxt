import mongoose, { Schema, model, Document, Types } from 'mongoose';
import type { ISubCategoriesDTO, ICategoryInfoDTO } from '../dtos/subCategories';


export type CategoryDocument = Document &
    ICategoryInfoDTO;

const ImageSchema = new Schema(
    {
    src: { type: String, required: true },
    alt: { type: String }
    },
    { _id: false }
);


const CategorySchema = new Schema<CategoryDocument>(
    {
        id: { type: String },
        title: { type: String, required: true },
        image: { type: ImageSchema, required: true },
    },
    {
        timestamps: true
    }
);



export const CategoryModel = model<CategoryDocument>('Category', CategorySchema);
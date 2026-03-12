import { Schema, model, Document, Types } from 'mongoose';

export interface CategoryDocument extends Document {
    _id: Types.ObjectId;
    id?: string;
    title: string;
    imageId: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new Schema<CategoryDocument>(
    {
        id: {
            type: String,
            default: function(this: CategoryDocument) {
                return this._id.toString();
            }
        },
        title: { type: String, required: true, trim: true },
        imageId: { type: String, default: null },
        image: { type: String, default: null },
    },
    {
        timestamps: true,
        collection: 'categories',
    }
);

export const CategoryModel = model<CategoryDocument>('Category', CategorySchema);
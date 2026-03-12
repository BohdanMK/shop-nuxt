import { Schema, model, Document, Types } from 'mongoose';

export type MediaObjectStatus = 'active' | 'deleted';

export interface MediaObjectDocument extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    originalName: string;
    fileName: string;
    filePath: string;
    mimeType: string;
    size: number;
    storage: 'local';
    status: MediaObjectStatus;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const MediaObjectSchema = new Schema<MediaObjectDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        originalName: { type: String, required: true },
        fileName: { type: String, required: true },
        filePath: { type: String, required: true },
        mimeType: { type: String, required: true },
        size: { type: Number, required: true },
        storage: { type: String, enum: ['local'], default: 'local' },
        status: { type: String, enum: ['active', 'deleted'], default: 'active', index: true },
        deletedAt: { type: Date },
    },
    {
        timestamps: true,
        collection: 'media_objects',
    }
);

MediaObjectSchema.index({ userId: 1, status: 1, createdAt: -1 });

export const MediaObject = model<MediaObjectDocument>('MediaObject', MediaObjectSchema);

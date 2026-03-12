import { Schema, model, Document, Types } from 'mongoose';

export interface UserDocument extends Document {
    _id: Types.ObjectId;
    name: string;
    userName: string;
    password: string;
    email: string;
    role: 'admin' | 'user' | 'moderator';
}

const UserSchema = new Schema<UserDocument>(
    {
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user', 'moderator'], default: 'user' }
    },
    {
        timestamps: true,
        collection: 'users',
    }
);

export const User = model<UserDocument>('User', UserSchema);
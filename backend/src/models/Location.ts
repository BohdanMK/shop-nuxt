import { Schema, model, Document, Types } from 'mongoose';
import type { Location as LocationDTO } from '../dtos/locations.dto';

export interface LocationDocument extends Document, Omit<LocationDTO, '_id'> {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContactPhoneSchema = new Schema(
  {
    value: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const LocationSchema = new Schema<LocationDocument>(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    locationType: { type: String, enum: ['restaurant', 'pickup'], required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    mainImg: {
      type: Schema.Types.Mixed,
      required: true,
    },
    address: { type: String, trim: true },
    description: { type: String, trim: true },
    mapStyle: { type: String, trim: true },
    images: { type: [String], default: [] },
    schedule: { type: String, trim: true },
    contactPhones: { type: [ContactPhoneSchema], default: [] },
  },
  {
    timestamps: true,
    collection: 'locations',
  },
);

export const LocationModel = model<LocationDocument>('Location', LocationSchema);

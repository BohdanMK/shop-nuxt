import { Schema, model, Document, Types } from 'mongoose';
import type { CompanyInfo as CompanyInfoDTO } from '../dtos/company-info.dto';

export interface CompanyInfoDocument extends Document {
  _id: Types.ObjectId;
  aboutDescription: CompanyInfoDTO['aboutDescription'];
  bannerContents: CompanyInfoDTO['bannerContents'];
  companyLogo: CompanyInfoDTO['companyLogo'];
  companyTitle: CompanyInfoDTO['companyTitle'];
  createdAt: Date;
  updatedAt: Date;
}

const BannerContentSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    imageAlt: { type: String, required: true, trim: true },
    bgImage: { type: String, trim: true },
    bgImageAlt: { type: String, trim: true },
  },
  { _id: false },
);

const CompanyLogoSchema = new Schema(
  {
    src: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const CompanyInfoSchema = new Schema<CompanyInfoDocument>(
  {
    aboutDescription: {
      type: String,
      required: true,
      trim: true,
      default: 'About our company',
    },
    bannerContents: { type: [BannerContentSchema], default: [] },
    companyLogo: {
      type: CompanyLogoSchema,
      required: true,
      default: {
        src: 'https://example.com/company-logo.png',
        alt: 'Company logo',
      },
    },
    companyTitle: {
      type: String,
      required: true,
      trim: true,
      default: 'Company',
    },
  },
  {
    timestamps: true,
    collection: 'companyInfo',
  },
);

export const CompanyInfoModel = model<CompanyInfoDocument>('CompanyInfo', CompanyInfoSchema);

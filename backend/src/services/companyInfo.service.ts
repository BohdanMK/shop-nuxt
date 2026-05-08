import type { CompanyInfo } from '../dtos/company-info.dto';
import { CompanyInfoDocument, CompanyInfoModel } from '../models/CompanyInfo';
import { createHttpError } from '../utils/httpError';

export interface CreateCompanyInfoPayload {
  aboutDescription?: string;
  bannerContents?: CompanyInfo['bannerContents'];
  companyLogo?: CompanyInfo['companyLogo'];
  companyTitle?: string;
}

export interface UpdateCompanyInfoPayload {
  aboutDescription?: string;
  bannerContents?: CompanyInfo['bannerContents'];
  companyLogo?: CompanyInfo['companyLogo'];
  companyTitle?: string;
}

const DEFAULT_COMPANY_INFO: CreateCompanyInfoPayload = {
  aboutDescription: 'About our company',
  bannerContents: [],
  companyLogo: {
    src: 'https://example.com/company-logo.png',
    alt: 'Company logo',
  },
  companyTitle: 'Company',
};

const readString = (value: unknown, field: string): string => {
  if (typeof value !== 'string') {
    throw createHttpError(`${field} must be a string`, 400);
  }

  return value.trim();
};

const readBannerItem = (value: unknown, field: string): CompanyInfo['bannerContents'][number] => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw createHttpError(`${field} must be an object`, 400);
  }

  const maybeBanner = value as {
    title?: unknown;
    subtitle?: unknown;
    image?: unknown;
    imageAlt?: unknown;
    bgImage?: unknown;
    bgImageAlt?: unknown;
  };

  const item: CompanyInfo['bannerContents'][number] = {
    title: readString(maybeBanner.title, `${field}.title`),
    subtitle: readString(maybeBanner.subtitle, `${field}.subtitle`),
    image: readString(maybeBanner.image, `${field}.image`),
    imageAlt: readString(maybeBanner.imageAlt, `${field}.imageAlt`),
  };

  if (maybeBanner.bgImage !== undefined) {
    item.bgImage = readString(maybeBanner.bgImage, `${field}.bgImage`);
  }

  if (maybeBanner.bgImageAlt !== undefined) {
    item.bgImageAlt = readString(maybeBanner.bgImageAlt, `${field}.bgImageAlt`);
  }

  return item;
};

const readBannerContents = (value: unknown): CompanyInfo['bannerContents'] => {
  if (!Array.isArray(value)) {
    throw createHttpError('bannerContents must be an array', 400);
  }

  return value.map((item, index) => readBannerItem(item, `bannerContents[${index}]`));
};

const readCompanyLogo = (value: unknown): CompanyInfo['companyLogo'] => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw createHttpError('companyLogo must be an object', 400);
  }

  const maybeLogo = value as { src?: unknown; alt?: unknown };

  return {
    src: readString(maybeLogo.src, 'companyLogo.src'),
    alt: readString(maybeLogo.alt, 'companyLogo.alt'),
  };
};

class CompanyInfoService {
  async getCompanyInfo(): Promise<CompanyInfoDocument> {
    const companyInfo = await CompanyInfoModel.findOne().sort({ createdAt: -1 }).lean();

    if (!companyInfo) {
      return CompanyInfoModel.create(DEFAULT_COMPANY_INFO);
    }

    return companyInfo;
  }

  async createCompanyInfo(payload: CreateCompanyInfoPayload): Promise<CompanyInfoDocument> {
    const existingCount = await CompanyInfoModel.countDocuments();
    if (existingCount > 0) {
      throw createHttpError('Company info already exists', 409);
    }

    const aboutDescription =
      payload.aboutDescription === undefined
        ? DEFAULT_COMPANY_INFO.aboutDescription
        : readString(payload.aboutDescription, 'aboutDescription');
    const bannerContents =
      payload.bannerContents === undefined
        ? DEFAULT_COMPANY_INFO.bannerContents
        : readBannerContents(payload.bannerContents);
    const companyLogo =
      payload.companyLogo === undefined
        ? DEFAULT_COMPANY_INFO.companyLogo
        : readCompanyLogo(payload.companyLogo);
    const companyTitle =
      payload.companyTitle === undefined
        ? DEFAULT_COMPANY_INFO.companyTitle
        : readString(payload.companyTitle, 'companyTitle');

    const createdCompanyInfo = await CompanyInfoModel.create({
      aboutDescription,
      bannerContents,
      companyLogo,
      companyTitle,
    });

    return createdCompanyInfo;
  }

  async updateCompanyInfo(payload: UpdateCompanyInfoPayload): Promise<CompanyInfoDocument> {
    if (!Object.keys(payload).length) {
      throw createHttpError('At least one field is required to update company info', 400);
    }

    const existing = await CompanyInfoModel.findOne().sort({ createdAt: -1 }).lean();
    if (!existing) {
      throw createHttpError('Company info not found', 404);
    }

    const updateData: Record<string, unknown> = {};

    if ('aboutDescription' in payload) {
      updateData.aboutDescription = readString(payload.aboutDescription, 'aboutDescription');
    }

    if ('bannerContents' in payload) {
      updateData.bannerContents = readBannerContents(payload.bannerContents);
    }

    if ('companyLogo' in payload) {
      updateData.companyLogo = readCompanyLogo(payload.companyLogo);
    }

    if ('companyTitle' in payload) {
      updateData.companyTitle = readString(payload.companyTitle, 'companyTitle');
    }

    const updatedCompanyInfo = await CompanyInfoModel.findByIdAndUpdate(existing._id, updateData, {
      new: true,
    }).lean();

    if (!updatedCompanyInfo) {
      throw createHttpError('Company info not found', 404);
    }

    return updatedCompanyInfo;
  }
}

export const companyInfoService = new CompanyInfoService();

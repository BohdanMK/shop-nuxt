
import { CategoryModel, CategoryDocument } from '../models/Category';
import { Types } from 'mongoose';

export interface CreateCategoryPayload {
  title: string;
  imageId: string | null;
  image: string | null;
}

export interface UpdateCategoryPayload {
  title?: string;
  imageId?: string | null;
  image?: string | null;
}

const createHttpError = (message: string, statusCode: number): Error & { statusCode: number } => {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  return error;
};

const normalizeNullableString = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized.length ? normalized : null;
};

const normalizeImagePath = (image: string | null): string | null => {
  if (!image) {
    return null;
  }

  const normalized = image.replace(/\\/g, '/');
  if (normalized.startsWith('/uploads/')) {
    return normalized;
  }

  if (normalized.startsWith('uploads/')) {
    return `/${normalized}`;
  }

  throw createHttpError('Image must be a path from uploads folder', 400);
};

class CategoryService {
  async getAllCategories(): Promise<CategoryDocument[]> {
    return CategoryModel.find().lean();
  }

  async getCategoryById(categoryId: string): Promise<CategoryDocument> {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw createHttpError('Invalid category id', 400);
    }

    const category = await CategoryModel.findById(categoryId).lean();

    if (!category) {
      throw createHttpError('Category not found', 404);
    }

    return category;
  }

  async createCategory(data: CreateCategoryPayload): Promise<CategoryDocument> {
    const title = typeof data.title === 'string' ? data.title.trim() : '';

    if (!title) {
      throw createHttpError('Category title is required', 400);
    }

    const imageId = normalizeNullableString(data.imageId);
    const image = normalizeImagePath(normalizeNullableString(data.image));

    const category = await CategoryModel.create({
      title,
      imageId,
      image,
    });

    return category;
  }

  async updateCategory(
    categoryId: string,
    data: UpdateCategoryPayload,
  ): Promise<CategoryDocument> {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw createHttpError('Invalid category id', 400);
    }

    const hasTitle = data.title !== undefined;
    const hasImageId = data.imageId !== undefined;
    const hasImage = data.image !== undefined;

    if (!hasTitle && !hasImageId && !hasImage) {
      throw createHttpError('At least one field is required to update category', 400);
    }

    const updateData: {
      title?: string;
      imageId?: string | null;
      image?: string | null;
    } = {};

    if (hasTitle) {
      const title = typeof data.title === 'string' ? data.title.trim() : '';

      if (!title) {
        throw createHttpError('Category title is required', 400);
      }

      updateData.title = title;
    }

    if (hasImageId) {
      updateData.imageId = normalizeNullableString(data.imageId);
    }

    if (hasImage) {
      updateData.image = normalizeImagePath(normalizeNullableString(data.image));
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true },
    ).lean();

    if (!updatedCategory) {
      throw createHttpError('Category not found', 404);
    }

    return updatedCategory;
  }

  async deleteCategory(categoryId: string): Promise<CategoryDocument> {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw createHttpError('Invalid category id', 400);
    }

    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      throw createHttpError('Category not found', 404);
    }

    return deletedCategory;
  }
}

export const categoryService = new CategoryService();
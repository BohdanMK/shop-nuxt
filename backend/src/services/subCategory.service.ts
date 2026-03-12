// src/services/subCategory.service.ts
import { Types } from 'mongoose';
import { SubCategoryModel } from '../models/SubCategory';
import { CategoryModel } from '../models/Category';

export interface CreateSubCategoryPayload {
    title: string;
}

export interface UpdateSubCategoryPayload {
    title?: string;
}

const createHttpError = (message: string, statusCode: number): Error & { statusCode: number } => {
    const error = new Error(message) as Error & { statusCode: number };
    error.statusCode = statusCode;
    return error;
};

const slugify = (value: string): string => {
    const normalized = value
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    if (normalized) {
        return normalized;
    }

    return `subcategory-${Date.now()}`;
};

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getSubCategoriesByCategoryId = async (categoryId: string) => {

    if (!Types.ObjectId.isValid(categoryId)) {
        throw createHttpError('Invalid category id', 400);
    }

    const subCategories = await SubCategoryModel.find({
        parentCategory: categoryId,
    }).lean();
    return subCategories;
};

export const createSubCategoryByCategoryId = async (
    categoryId: string,
    data: CreateSubCategoryPayload,
) => {
    if (!Types.ObjectId.isValid(categoryId)) {
        throw createHttpError('Invalid category id', 400);
    }

    const title = typeof data.title === 'string' ? data.title.trim() : '';
    if (!title) {
        throw createHttpError('Subcategory title is required', 400);
    }

    const categoryExists = await CategoryModel.exists({ _id: categoryId });
    if (!categoryExists) {
        throw createHttpError('Category not found', 404);
    }

    const pathName = slugify(title);
    const titleRegex = new RegExp(`^${escapeRegex(title)}$`, 'i');

    const existingSubCategory = await SubCategoryModel.findOne({
        parentCategory: categoryId,
        $or: [
            { pathName },
            { title: titleRegex },
        ],
    }).lean();

    if (existingSubCategory) {
        throw createHttpError('Subcategory already exists in this category', 409);
    }

    const createdSubCategory = await SubCategoryModel.create({
        title,
        pathName,
        parentCategory: categoryId,
    });

    return createdSubCategory;
};

export const updateSubCategoryByCategoryId = async (
    categoryId: string,
    subCategoryId: string,
    data: UpdateSubCategoryPayload,
) => {
    if (!Types.ObjectId.isValid(categoryId)) {
        throw createHttpError('Invalid category id', 400);
    }

    if (!Types.ObjectId.isValid(subCategoryId)) {
        throw createHttpError('Invalid subcategory id', 400);
    }

    const hasTitle = data.title !== undefined;
    if (!hasTitle) {
        throw createHttpError('At least one field is required to update subcategory', 400);
    }

    const updateData: {
        title?: string;
        pathName?: string;
    } = {};

    if (hasTitle) {
        const title = typeof data.title === 'string' ? data.title.trim() : '';
        if (!title) {
            throw createHttpError('Subcategory title is required', 400);
        }

        const pathName = slugify(title);
        const titleRegex = new RegExp(`^${escapeRegex(title)}$`, 'i');

        const duplicateSubCategory = await SubCategoryModel.findOne({
            _id: { $ne: subCategoryId },
            parentCategory: categoryId,
            $or: [
                { pathName },
                { title: titleRegex },
            ],
        }).lean();

        if (duplicateSubCategory) {
            throw createHttpError('Subcategory already exists in this category', 409);
        }

        updateData.title = title;
        updateData.pathName = pathName;
    }

    const updatedSubCategory = await SubCategoryModel.findOneAndUpdate(
        {
            _id: subCategoryId,
            parentCategory: categoryId,
        },
        updateData,
        { new: true },
    ).lean();

    if (!updatedSubCategory) {
        throw createHttpError('Subcategory not found for this category', 404);
    }

    return updatedSubCategory;
};

export const deleteSubCategoryByCategoryId = async (
    categoryId: string,
    subCategoryId: string,
) => {
    if (!Types.ObjectId.isValid(categoryId)) {
        throw createHttpError('Invalid category id', 400);
    }

    if (!Types.ObjectId.isValid(subCategoryId)) {
        throw createHttpError('Invalid subcategory id', 400);
    }

    const deletedSubCategory = await SubCategoryModel.findOneAndDelete({
        _id: subCategoryId,
        parentCategory: categoryId,
    }).lean();

    if (!deletedSubCategory) {
        throw createHttpError('Subcategory not found for this category', 404);
    }

    return deletedSubCategory;
};



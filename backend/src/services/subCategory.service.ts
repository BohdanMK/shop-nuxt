// src/services/subCategory.service.ts
import { Types } from 'mongoose';
import { SubCategoryModel } from '../models/SubCategory';

export const getSubCategoriesByCategoryId = async (categoryId: string) => {

    if (!Types.ObjectId.isValid(categoryId)) {
        throw new Error('Invalid category id');
    }

    const subCategories = await SubCategoryModel.find({
        parentCategory: categoryId,
    }).lean();
    return subCategories;
};



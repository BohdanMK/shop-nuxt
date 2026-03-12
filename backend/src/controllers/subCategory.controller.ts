import { Request, Response, NextFunction } from 'express';
import {
  createSubCategoryByCategoryId,
  deleteSubCategoryByCategoryId,
  getSubCategoriesByCategoryId,
  updateSubCategoryByCategoryId,
} from '../services/subCategory.service';

export const getSubCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { categoryId } = req.params;

    const subCategories = await getSubCategoriesByCategoryId(categoryId as string);
    res.json(subCategories);
  } catch (err) {
    next(err);
  }
};

export const createSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: 'Category id is required' });
    }

    const createdSubCategory = await createSubCategoryByCategoryId(categoryId, {
      title: req.body?.title,
    });

    res.status(201).json(createdSubCategory);
  } catch (err) {
    next(err);
  }
};

export const updateSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryId, subCategoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: 'Category id is required' });
    }

    if (!subCategoryId) {
      return res.status(400).json({ message: 'Subcategory id is required' });
    }

    const updatedSubCategory = await updateSubCategoryByCategoryId(
      categoryId,
      subCategoryId,
      {
        title: req.body?.title,
      },
    );

    res.status(200).json(updatedSubCategory);
  } catch (err) {
    next(err);
  }
};

export const deleteSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryId, subCategoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: 'Category id is required' });
    }

    if (!subCategoryId) {
      return res.status(400).json({ message: 'Subcategory id is required' });
    }

    const deletedSubCategory = await deleteSubCategoryByCategoryId(
      categoryId,
      subCategoryId,
    );

    res.status(200).json(deletedSubCategory);
  } catch (err) {
    next(err);
  }
};
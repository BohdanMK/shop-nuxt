import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/category.service';

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: 'Category id is required' });
    }

    const category = await categoryService.getCategoryById(categoryId);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await categoryService.createCategory({
      title: req.body?.title,
      imageId: req.body?.imageId ?? null,
      image: req.body?.image ?? null,
    });

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: 'Category id is required' });
    }

    const updatedCategory = await categoryService.updateCategory(categoryId, {
      title: req.body?.title,
      imageId: req.body?.imageId,
      image: req.body?.image,
    });

    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: 'Category id is required' });
    }

    const deletedCategory = await categoryService.deleteCategory(categoryId);
    res.status(200).json(deletedCategory);
  } catch (err) {
    next(err);
  }
};

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

export const getAdminCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const sortBy = (req.query.sortBy as string) ?? 'title';
    const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';
    const search = req.query.search as string | undefined;
    const status = req.query.status as 'active' | 'inactive' | undefined;

    const result = await categoryService.getAdminCategories({
      page,
      limit,
      sortBy,
      sortOrder,
      ...(search !== undefined && { search }),
      ...(status !== undefined && { status }),
    });

    res.status(200).json(result);
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

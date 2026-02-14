import { Request, Response, NextFunction } from 'express';
import { getSubCategoriesByCategoryId } from '../services/subCategory.service';

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
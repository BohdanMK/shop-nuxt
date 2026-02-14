import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/category.service';

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await categoryService.getAllCategories();
    // тут ти отримаєш масив документів як у Compass
    res.status(200).json(categories);
  } catch (err) {
    next(err); // або свій handler
  }
};
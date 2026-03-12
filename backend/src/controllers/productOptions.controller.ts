import type { Request, Response, NextFunction } from 'express';
import {
  createProductOptionGroup,
  deleteProductOptionGroup,
  getProductOptionGroupById,
  listProductOptionGroups,
  updateProductOptionGroup,
} from '../services/productOptions.service';

export const listProductOptions = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const optionGroups = await listProductOptionGroups();
    res.status(200).json(optionGroups);
  } catch (err) {
    next(err);
  }
};

export const createProductOption = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const createdOptionGroup = await createProductOptionGroup(req.body);
    res.status(201).json(createdOptionGroup);
  } catch (err) {
    next(err);
  }
};

export const getProductOptionById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { optionId } = req.params;

    if (!optionId) {
      return res.status(400).json({ message: 'Option id is required' });
    }

    const optionGroup = await getProductOptionGroupById(optionId);
    res.status(200).json(optionGroup);
  } catch (err) {
    next(err);
  }
};

export const updateProductOption = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { optionId } = req.params;

    if (!optionId) {
      return res.status(400).json({ message: 'Option id is required' });
    }

    const updatedOptionGroup = await updateProductOptionGroup(optionId, req.body);
    res.status(200).json(updatedOptionGroup);
  } catch (err) {
    next(err);
  }
};

export const deleteProductOption = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { optionId } = req.params;

    if (!optionId) {
      return res.status(400).json({ message: 'Option id is required' });
    }

    const deletedOptionGroup = await deleteProductOptionGroup(optionId);
    res.status(200).json(deletedOptionGroup);
  } catch (err) {
    next(err);
  }
};

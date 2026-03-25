import type { Request, Response, NextFunction } from 'express';
import {
  addProductOptionGroup,
  createProduct,
  deleteProduct,
  deleteProductOptionGroupFromProduct,
  getProductById,
  getProductOptionGroups,
  getProducts,
  updateProduct,
  updateProductOptionGroupInProduct,
} from '../services/product.service';
import type { GetProductsFilters } from '../services/product.service';

export const getProductsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page,
      limit,
      categoryId,
      subCategoryId,
      isOnSale,
      search,
      sortBy,
      sortOrder,
    } = req.query;

    const filters: GetProductsFilters = {};

    if (typeof page === 'string') {
      const parsed = Number(page);
      if (!Number.isNaN(parsed)) {
        filters.page = parsed;
      }
    }

    if (typeof limit === 'string') {
      const parsed = Number(limit);
      if (!Number.isNaN(parsed)) {
        filters.limit = parsed;
      }
    }

    if (typeof categoryId === 'string' && categoryId.trim()) {
      filters.categoryId = categoryId;
    }

    if (typeof subCategoryId === 'string' && subCategoryId.trim()) {

      filters.subCategoryId = subCategoryId;
    }

    if (typeof isOnSale === 'string') {
      filters.isOnSale = isOnSale === 'true';
    }

    if (typeof search === 'string' && search.trim()) {
      filters.search = search.trim();
    }

    if (typeof sortBy === 'string') {
      const normalizedSortBy = sortBy.trim().toLowerCase();

      if (
        normalizedSortBy === 'createdat' ||
        normalizedSortBy === 'title' ||
        normalizedSortBy === 'price' ||
        normalizedSortBy === 'saleprice'
      ) {
        const mappedSortBy =
          normalizedSortBy === 'createdat'
            ? 'createdAt'
            : normalizedSortBy === 'saleprice'
              ? 'salePrice'
              : normalizedSortBy;

        filters.sortBy = mappedSortBy;
      }
    }

    if (typeof sortOrder === 'string') {
      const normalizedSortOrder = sortOrder.trim().toLowerCase();

      if (normalizedSortOrder === 'asc' || normalizedSortOrder === 'desc') {
        filters.sortOrder = normalizedSortOrder;
      }
    }

    const result = await getProducts(filters);
    res.json(result);

  } catch (err) {
    next(err);
  }
};

export const getProductByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: 'Product id is required' });
    }

    const product = await getProductById(productId);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const createProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const createdProduct = await createProduct(req.body);
    res.status(201).json(createdProduct);
  } catch (err) {
    next(err);
  }
};

export const updateProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: 'Product id is required' });
    }

    const updatedProduct = await updateProduct(productId, req.body);
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

export const deleteProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: 'Product id is required' });
    }

    const deletedProduct = await deleteProduct(productId);
    res.status(200).json(deletedProduct);
  } catch (err) {
    next(err);
  }
};

export const getProductOptionGroupsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: 'Product id is required' });
    }

    const optionGroups = await getProductOptionGroups(productId);
    res.status(200).json(optionGroups);
  } catch (err) {
    next(err);
  }
};

export const addProductOptionGroupHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: 'Product id is required' });
    }

    const createdOptionGroup = await addProductOptionGroup(productId, req.body);
    res.status(201).json(createdOptionGroup);
  } catch (err) {
    next(err);
  }
};

export const updateProductOptionGroupHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId, optionGroupId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: 'Product id is required' });
    }

    if (!optionGroupId) {
      return res.status(400).json({ message: 'Option group id is required' });
    }

    const updatedOptionGroup = await updateProductOptionGroupInProduct(
      productId,
      optionGroupId,
      req.body,
    );

    res.status(200).json(updatedOptionGroup);
  } catch (err) {
    next(err);
  }
};

export const deleteProductOptionGroupHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId, optionGroupId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: 'Product id is required' });
    }

    if (!optionGroupId) {
      return res.status(400).json({ message: 'Option group id is required' });
    }

    const deletedOptionGroup = await deleteProductOptionGroupFromProduct(productId, optionGroupId);
    res.status(200).json(deletedOptionGroup);
  } catch (err) {
    next(err);
  }
};

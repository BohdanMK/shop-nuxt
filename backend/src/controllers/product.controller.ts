import type { Request, Response, NextFunction } from 'express';
import { getProducts } from '../services/product.service';
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
      search
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

    const result = await getProducts(filters);
    res.json(result);

  } catch (err) {
    next(err);
  }
};

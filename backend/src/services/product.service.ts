import { Types, FilterQuery } from 'mongoose';
import { ProductModel, ProductDocument } from '../models/Product';
import type { ProductDTO } from '../dtos/product.dto';
import type {  PaginatedResponse } from '../dtos/response.dto';

export interface GetProductsFilters {
  page?: number;
  limit?: number;
  categoryId?: string;
  subCategoryId?: string;
  isOnSale?: boolean;
  search?: string; // пошук по title
}




const mapProductToDTO = (doc: ProductDocument): ProductDTO => {
  const dto: ProductDTO = {
    _id: doc._id as string,
    id: doc.id,
    title: doc.title,
    image: doc.image,
    isOnSale: doc.isOnSale,
    weightGrams: doc.weightGrams,
    components: doc.components,
    price: doc.price
  };

  if (doc.salePrice != null) {
    dto.salePrice = doc.salePrice;
  }

  if (doc.ctaLabel != null) {
    dto.ctaLabel = doc.ctaLabel;
  }

  if (doc.optionGroups && doc.optionGroups.length > 0) {
    dto.optionGroups = doc.optionGroups;
  }

  if (doc.categoryId) {
    dto.categoryId = String(doc.categoryId);
  }

  if (doc.categoryName != null) {
    dto.categoryName = doc.categoryName;
  }

  if (doc.subCategoryId) {
    dto.subCategoryId = String(doc.subCategoryId);
  }

  if (doc.subCategoryName != null) {
    dto.subCategoryName = doc.subCategoryName;
  }

  return dto;
};

export const getProducts = async (
  filters: GetProductsFilters
): Promise<PaginatedResponse<ProductDTO[]>> => {
  const {
    page = 1,
    limit = 12,
    categoryId,
    subCategoryId,
    isOnSale,
    search
  } = filters;
  console.log(filters)
  const safePage = page < 1 ? 1 : page;
  const safeLimit = Math.min(Math.max(limit, 1), 100);

  const query: FilterQuery<ProductDocument> = {};

  if (categoryId) {
    try {
      query.categoryId = new Types.ObjectId(categoryId);
    } catch {
      // якщо кинули кривий id — просто не фільтруємо по ньому
    }
  }

  if (subCategoryId) {
    try {
      query.subCategoryId = new Types.ObjectId(subCategoryId);
    } catch {}
  }

  if (typeof isOnSale === 'boolean') {
    query.isOnSale = isOnSale;
  }

  if (search && search.trim()) {
    query.title = { $regex: search.trim(), $options: 'i' };
  }

  const [docs, total] = await Promise.all([
    ProductModel.find(query)
      .sort({ createdAt: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit),
    ProductModel.countDocuments(query)
  ]);

  const items = docs.map(mapProductToDTO);

  return {
    items,
    total,
    page: safePage,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit) || 1
  };
};

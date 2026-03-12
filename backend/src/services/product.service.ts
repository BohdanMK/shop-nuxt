import { Types, FilterQuery } from 'mongoose';
import { ProductModel, ProductDocument } from '../models/Product';
import type {
  ProductDTO,
  ProductOptionGroupDTO,
  ProductOptionGroupType,
  ProductOptionValueDTO,
} from '../dtos/product.dto';
import type {  PaginatedResponse } from '../dtos/response.dto';

export interface GetProductsFilters {
  page?: number;
  limit?: number;
  categoryId?: string;
  subCategoryId?: string;
  isOnSale?: boolean;
  search?: string; // пошук по title
}

export interface CreateProductPayload {
  id?: string;
  title: string;
  image: ProductDTO['image'];
  isOnSale?: boolean;
  salePrice?: number;
  weightGrams: number;
  components?: ProductDTO['components'];
  price: ProductDTO['price'];
  ctaLabel?: string;
  optionGroups?: ProductOptionGroupDTO[];
  categoryId?: string;
  categoryName?: string;
  subCategoryId?: string;
  subCategoryName?: string;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export type CreateProductOptionGroupPayload = Omit<ProductOptionGroupDTO, 'id'> & {
  id?: string;
};

export type UpdateProductOptionGroupPayload = Partial<Omit<ProductOptionGroupDTO, 'id'>>;

type ParsedCreateProductPayload = {
  id?: string;
  title: string;
  image: ProductDTO['image'];
  isOnSale: boolean;
  salePrice?: number;
  weightGrams: number;
  components: ProductDTO['components'];
  price: ProductDTO['price'];
  ctaLabel?: string;
  optionGroups: ProductOptionGroupDTO[];
  categoryId?: Types.ObjectId;
  categoryName?: string;
  subCategoryId?: Types.ObjectId;
  subCategoryName?: string;
};

type ParsedUpdateProductPayload = {
  id?: string;
  title?: string;
  image?: ProductDTO['image'];
  isOnSale?: boolean;
  salePrice?: number | null;
  weightGrams?: number;
  components?: ProductDTO['components'];
  price?: ProductDTO['price'];
  ctaLabel?: string | null;
  optionGroups?: ProductOptionGroupDTO[];
  categoryId?: Types.ObjectId | null;
  categoryName?: string | null;
  subCategoryId?: Types.ObjectId | null;
  subCategoryName?: string | null;
};

type ParsedUpdateOptionGroupPayload = {
  name?: string;
  type?: ProductOptionGroupType;
  required?: boolean;
  minSelected?: number;
  maxSelected?: number;
  values?: ProductOptionValueDTO[];
};

const createHttpError = (message: string, statusCode: number): Error & { statusCode: number } => {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  return error;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const readRequiredString = (value: unknown, field: string): string => {
  if (typeof value !== 'string') {
    throw createHttpError(`${field} must be a string`, 400);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    throw createHttpError(`${field} is required`, 400);
  }

  return trimmed;
};

const readOptionalString = (value: unknown, field: string): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== 'string') {
    throw createHttpError(`${field} must be a string`, 400);
  }

  const trimmed = value.trim();
  return trimmed || undefined;
};

const readNonNegativeNumber = (value: unknown, field: string): number => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw createHttpError(`${field} must be a non-negative number`, 400);
  }

  return value;
};

const readNonNegativeInteger = (value: unknown, field: string): number => {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
    throw createHttpError(`${field} must be a non-negative integer`, 400);
  }

  return value;
};

const readBoolean = (value: unknown, field: string): boolean => {
  if (typeof value !== 'boolean') {
    throw createHttpError(`${field} must be a boolean`, 400);
  }

  return value;
};

const readOptionGroupType = (value: unknown, field: string): ProductOptionGroupType => {
  if (value !== 'single' && value !== 'multiple') {
    throw createHttpError(`${field} must be "single" or "multiple"`, 400);
  }

  return value;
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const parseImage = (value: unknown, field: string): ProductDTO['image'] => {
  if (!isRecord(value)) {
    throw createHttpError(`${field} must be an object`, 400);
  }

  const image: ProductDTO['image'] = {
    src: readRequiredString(value.src, `${field}.src`),
  };

  const alt = readOptionalString(value.alt, `${field}.alt`);
  if (alt !== undefined) {
    image.alt = alt;
  }

  return image;
};

const parseComponents = (value: unknown, field: string): ProductDTO['components'] => {
  if (!Array.isArray(value)) {
    throw createHttpError(`${field} must be an array`, 400);
  }

  return value.map((component, index) => {
    if (!isRecord(component)) {
      throw createHttpError(`${field}[${index}] must be an object`, 400);
    }

    return {
      name: readRequiredString(component.name, `${field}[${index}].name`),
      image: parseImage(component.image, `${field}[${index}].image`),
    };
  });
};

const parsePrice = (value: unknown, field: string): ProductDTO['price'] => {
  if (!isRecord(value)) {
    throw createHttpError(`${field} must be an object`, 400);
  }

  const amount = readNonNegativeNumber(value.amount, `${field}.amount`);
  const currency = value.currency === undefined ? 'UAH' : value.currency;

  if (currency !== 'UAH') {
    throw createHttpError(`${field}.currency must be UAH`, 400);
  }

  return { amount, currency: 'UAH' };
};

const parseExtraPrice = (
  value: unknown,
  field: string,
): NonNullable<ProductOptionValueDTO['extraPrice']> => {
  if (typeof value === 'number') {
    return {
      amount: readNonNegativeNumber(value, field),
      currency: 'UAH',
    };
  }

  return parsePrice(value, field);
};

const parseOptionValues = (value: unknown, field: string): ProductOptionValueDTO[] => {
  if (!Array.isArray(value)) {
    throw createHttpError(`${field} must be an array`, 400);
  }

  const usedIds = new Set<string>();

  return value.map((rawValue, index) => {
    if (!isRecord(rawValue)) {
      throw createHttpError(`${field}[${index}] must be an object`, 400);
    }

    const label = readRequiredString(rawValue.label, `${field}[${index}].label`);
    const providedId = readOptionalString(rawValue.id, `${field}[${index}].id`);
    const baseGeneratedId = slugify(label) || `value-${index + 1}`;

    let resolvedId = providedId ?? baseGeneratedId;
    if (providedId && usedIds.has(providedId)) {
      throw createHttpError(`${field}[${index}].id must be unique`, 400);
    }

    if (!providedId) {
      let suffix = 1;
      while (usedIds.has(resolvedId)) {
        resolvedId = `${baseGeneratedId}-${suffix}`;
        suffix += 1;
      }
    }

    usedIds.add(resolvedId);

    const parsed: ProductOptionValueDTO = {
      id: resolvedId,
      label,
    };

    const description = readOptionalString(rawValue.description, `${field}[${index}].description`);
    if (description !== undefined) {
      parsed.description = description;
    }

    if (rawValue.image !== undefined) {
      parsed.image = parseImage(rawValue.image, `${field}[${index}].image`);
    }

    if (rawValue.extraPrice !== undefined) {
      parsed.extraPrice = parseExtraPrice(rawValue.extraPrice, `${field}[${index}].extraPrice`);
    }

    if (rawValue.components !== undefined) {
      parsed.components = parseComponents(rawValue.components, `${field}[${index}].components`);
    }

    return parsed;
  });
};

const ensureSelectionBounds = (
  type: ProductOptionGroupType,
  minSelected: number | undefined,
  maxSelected: number | undefined,
): void => {
  if (minSelected !== undefined && maxSelected !== undefined && minSelected > maxSelected) {
    throw createHttpError('minSelected cannot be greater than maxSelected', 400);
  }

  if (type === 'single') {
    if (minSelected !== undefined && minSelected > 1) {
      throw createHttpError('For single type, minSelected cannot be greater than 1', 400);
    }

    if (maxSelected !== undefined && maxSelected > 1) {
      throw createHttpError('For single type, maxSelected cannot be greater than 1', 400);
    }
  }
};

const parseOptionGroupCreatePayload = (
  value: unknown,
  field: string,
  fallbackId?: string,
): ProductOptionGroupDTO => {
  if (!isRecord(value)) {
    throw createHttpError(`${field} must be an object`, 400);
  }

  const name = readRequiredString(value.name, `${field}.name`);
  const type = readOptionGroupType(value.type, `${field}.type`);
  const required = value.required === undefined ? false : readBoolean(value.required, `${field}.required`);
  const values = value.values === undefined ? [] : parseOptionValues(value.values, `${field}.values`);

  const optionGroupId =
    readOptionalString(value.id, `${field}.id`) ??
    fallbackId ??
    (slugify(name) || `group-${Date.now()}`);

  const parsed: ProductOptionGroupDTO = {
    id: optionGroupId,
    name,
    type,
    required,
    values,
  };

  if (value.minSelected !== undefined) {
    parsed.minSelected = readNonNegativeInteger(value.minSelected, `${field}.minSelected`);
  }

  if (value.maxSelected !== undefined) {
    parsed.maxSelected = readNonNegativeInteger(value.maxSelected, `${field}.maxSelected`);
  }

  ensureSelectionBounds(parsed.type, parsed.minSelected, parsed.maxSelected);

  return parsed;
};

const parseOptionGroupUpdatePayload = (
  payload: UpdateProductOptionGroupPayload,
): ParsedUpdateOptionGroupPayload => {
  const rawPayload = payload as unknown;

  if (!isRecord(rawPayload)) {
    throw createHttpError('Payload must be an object', 400);
  }

  const parsed: ParsedUpdateOptionGroupPayload = {};

  if ('name' in rawPayload) {
    parsed.name = readRequiredString(rawPayload.name, 'name');
  }

  if ('type' in rawPayload) {
    parsed.type = readOptionGroupType(rawPayload.type, 'type');
  }

  if ('required' in rawPayload) {
    parsed.required = readBoolean(rawPayload.required, 'required');
  }

  if ('minSelected' in rawPayload) {
    parsed.minSelected = readNonNegativeInteger(rawPayload.minSelected, 'minSelected');
  }

  if ('maxSelected' in rawPayload) {
    parsed.maxSelected = readNonNegativeInteger(rawPayload.maxSelected, 'maxSelected');
  }

  if ('values' in rawPayload) {
    parsed.values = parseOptionValues(rawPayload.values, 'values');
  }

  return parsed;
};

const parseOptionGroups = (value: unknown, field: string): ProductOptionGroupDTO[] => {
  if (!Array.isArray(value)) {
    throw createHttpError(`${field} must be an array`, 400);
  }

  const usedIds = new Set<string>();

  return value.map((rawOptionGroup, index) => {
    const parsed = parseOptionGroupCreatePayload(rawOptionGroup, `${field}[${index}]`);

    let uniqueId = parsed.id;
    const baseId = uniqueId;
    let suffix = 1;
    while (usedIds.has(uniqueId)) {
      uniqueId = `${baseId}-${suffix}`;
      suffix += 1;
    }

    usedIds.add(uniqueId);

    return {
      ...parsed,
      id: uniqueId,
    };
  });
};

const parseObjectId = (value: unknown, field: string): Types.ObjectId => {
  const id = readRequiredString(value, field);
  if (!Types.ObjectId.isValid(id)) {
    throw createHttpError(`${field} is invalid`, 400);
  }

  return new Types.ObjectId(id);
};

const parseCreateProductPayload = (payload: CreateProductPayload): ParsedCreateProductPayload => {
  const rawPayload = payload as unknown;
  if (!isRecord(rawPayload)) {
    throw createHttpError('Payload must be an object', 400);
  }

  const parsed: ParsedCreateProductPayload = {
    title: readRequiredString(rawPayload.title, 'title'),
    image: parseImage(rawPayload.image, 'image'),
    isOnSale: rawPayload.isOnSale === undefined ? false : readBoolean(rawPayload.isOnSale, 'isOnSale'),
    weightGrams: readNonNegativeNumber(rawPayload.weightGrams, 'weightGrams'),
    components: rawPayload.components === undefined ? [] : parseComponents(rawPayload.components, 'components'),
    price: parsePrice(rawPayload.price, 'price'),
    optionGroups: rawPayload.optionGroups === undefined ? [] : parseOptionGroups(rawPayload.optionGroups, 'optionGroups'),
  };

  const id = readOptionalString(rawPayload.id, 'id');
  if (id !== undefined) {
    parsed.id = id;
  }

  if (rawPayload.salePrice !== undefined) {
    parsed.salePrice = readNonNegativeNumber(rawPayload.salePrice, 'salePrice');
  }

  const ctaLabel = readOptionalString(rawPayload.ctaLabel, 'ctaLabel');
  if (ctaLabel !== undefined) {
    parsed.ctaLabel = ctaLabel;
  }

  if (rawPayload.categoryId !== undefined) {
    parsed.categoryId = parseObjectId(rawPayload.categoryId, 'categoryId');
  }

  const categoryName = readOptionalString(rawPayload.categoryName, 'categoryName');
  if (categoryName !== undefined) {
    parsed.categoryName = categoryName;
  }

  if (rawPayload.subCategoryId !== undefined) {
    parsed.subCategoryId = parseObjectId(rawPayload.subCategoryId, 'subCategoryId');
  }

  const subCategoryName = readOptionalString(rawPayload.subCategoryName, 'subCategoryName');
  if (subCategoryName !== undefined) {
    parsed.subCategoryName = subCategoryName;
  }

  return parsed;
};

const parseUpdateProductPayload = (payload: UpdateProductPayload): ParsedUpdateProductPayload => {
  const rawPayload = payload as unknown;
  if (!isRecord(rawPayload)) {
    throw createHttpError('Payload must be an object', 400);
  }

  const parsed: ParsedUpdateProductPayload = {};

  if ('id' in rawPayload) {
    parsed.id = readRequiredString(rawPayload.id, 'id');
  }

  if ('title' in rawPayload) {
    parsed.title = readRequiredString(rawPayload.title, 'title');
  }

  if ('image' in rawPayload) {
    parsed.image = parseImage(rawPayload.image, 'image');
  }

  if ('isOnSale' in rawPayload) {
    parsed.isOnSale = readBoolean(rawPayload.isOnSale, 'isOnSale');
  }

  if ('salePrice' in rawPayload) {
    if (rawPayload.salePrice === null) {
      parsed.salePrice = null;
    } else {
      parsed.salePrice = readNonNegativeNumber(rawPayload.salePrice, 'salePrice');
    }
  }

  if ('weightGrams' in rawPayload) {
    parsed.weightGrams = readNonNegativeNumber(rawPayload.weightGrams, 'weightGrams');
  }

  if ('components' in rawPayload) {
    parsed.components = parseComponents(rawPayload.components, 'components');
  }

  if ('price' in rawPayload) {
    parsed.price = parsePrice(rawPayload.price, 'price');
  }

  if ('ctaLabel' in rawPayload) {
    if (rawPayload.ctaLabel === null) {
      parsed.ctaLabel = null;
    } else {
      parsed.ctaLabel = readRequiredString(rawPayload.ctaLabel, 'ctaLabel');
    }
  }

  if ('optionGroups' in rawPayload) {
    parsed.optionGroups = parseOptionGroups(rawPayload.optionGroups, 'optionGroups');
  }

  if ('categoryId' in rawPayload) {
    parsed.categoryId = rawPayload.categoryId === null ? null : parseObjectId(rawPayload.categoryId, 'categoryId');
  }

  if ('categoryName' in rawPayload) {
    if (rawPayload.categoryName === null) {
      parsed.categoryName = null;
    } else {
      parsed.categoryName = readRequiredString(rawPayload.categoryName, 'categoryName');
    }
  }

  if ('subCategoryId' in rawPayload) {
    parsed.subCategoryId =
      rawPayload.subCategoryId === null ? null : parseObjectId(rawPayload.subCategoryId, 'subCategoryId');
  }

  if ('subCategoryName' in rawPayload) {
    if (rawPayload.subCategoryName === null) {
      parsed.subCategoryName = null;
    } else {
      parsed.subCategoryName = readRequiredString(rawPayload.subCategoryName, 'subCategoryName');
    }
  }

  return parsed;
};

const buildProductIdentityQuery = (productId: string): FilterQuery<ProductDocument> => {
  const trimmedId = productId.trim();

  if (!trimmedId) {
    throw createHttpError('Product id is required', 400);
  }

  if (Types.ObjectId.isValid(trimmedId)) {
    return {
      $or: [{ _id: new Types.ObjectId(trimmedId) }, { id: trimmedId }],
    };
  }

  return { id: trimmedId };
};

const findOptionGroupIndex = (
  optionGroups: ProductOptionGroupDTO[],
  optionGroupId: string,
): number => optionGroups.findIndex((group) => group.id === optionGroupId);

const readOptionGroupIdParam = (optionGroupId: string): string => {
  const parsedOptionGroupId = optionGroupId.trim();
  if (!parsedOptionGroupId) {
    throw createHttpError('Option group id is required', 400);
  }

  return parsedOptionGroupId;
};




const mapProductToDTO = (doc: ProductDocument): ProductDTO => {
  const productSlugId = doc.get('id') as string | undefined;

  const dto: ProductDTO = {
    _id: doc._id as string,
    title: doc.title,
    image: doc.image,
    isOnSale: doc.isOnSale,
    weightGrams: doc.weightGrams,
    components: doc.components,
    price: doc.price
  };

  if (productSlugId != null) {
    dto.id = productSlugId;
  }

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

  const safePage = page < 1 ? 1 : page;
  const safeLimit = Math.min(Math.max(limit, 1), 100);

  const query: FilterQuery<ProductDocument> = {};

  if (categoryId) {
    try {
      query.categoryId = new Types.ObjectId(categoryId);
    } catch {

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

export const getProductById = async (productId: string): Promise<ProductDTO> => {
  const query = buildProductIdentityQuery(productId);
  const product = await ProductModel.findOne(query);

  if (!product) {
    throw createHttpError('Product not found', 404);
  }

  return mapProductToDTO(product);
};

export const createProduct = async (payload: CreateProductPayload): Promise<ProductDTO> => {
  const parsedPayload = parseCreateProductPayload(payload);

  if (parsedPayload.id) {
    const duplicate = await ProductModel.exists({ id: parsedPayload.id });
    if (duplicate) {
      throw createHttpError('Product with this id already exists', 409);
    }
  }

  const createdProduct = await ProductModel.create(parsedPayload);
  return mapProductToDTO(createdProduct);
};

export const updateProduct = async (
  productId: string,
  payload: UpdateProductPayload,
): Promise<ProductDTO> => {
  const query = buildProductIdentityQuery(productId);
  const parsedPayload = parseUpdateProductPayload(payload);

  if (Object.keys(parsedPayload).length === 0) {
    throw createHttpError('At least one field is required to update product', 400);
  }

  const existingProduct = await ProductModel.findOne(query);

  if (!existingProduct) {
    throw createHttpError('Product not found', 404);
  }

  const currentCustomId = existingProduct.get('id') as string | undefined;
  if (parsedPayload.id && parsedPayload.id !== currentCustomId) {
    const duplicate = await ProductModel.exists({
      id: parsedPayload.id,
      _id: { $ne: existingProduct._id },
    });

    if (duplicate) {
      throw createHttpError('Product with this id already exists', 409);
    }
  }

  if (parsedPayload.id !== undefined) {
    existingProduct.set('id', parsedPayload.id);
  }

  if (parsedPayload.title !== undefined) {
    existingProduct.title = parsedPayload.title;
  }

  if (parsedPayload.image !== undefined) {
    existingProduct.image = parsedPayload.image;
  }

  if (parsedPayload.isOnSale !== undefined) {
    existingProduct.isOnSale = parsedPayload.isOnSale;
  }

  if (parsedPayload.salePrice !== undefined) {
    if (parsedPayload.salePrice === null) {
      existingProduct.set('salePrice', undefined);
    } else {
      existingProduct.salePrice = parsedPayload.salePrice;
    }
  }

  if (parsedPayload.weightGrams !== undefined) {
    existingProduct.weightGrams = parsedPayload.weightGrams;
  }

  if (parsedPayload.components !== undefined) {
    existingProduct.components = parsedPayload.components;
  }

  if (parsedPayload.price !== undefined) {
    existingProduct.price = parsedPayload.price;
  }

  if (parsedPayload.ctaLabel !== undefined) {
    if (parsedPayload.ctaLabel === null) {
      existingProduct.set('ctaLabel', undefined);
    } else {
      existingProduct.ctaLabel = parsedPayload.ctaLabel;
    }
  }

  if (parsedPayload.optionGroups !== undefined) {
    existingProduct.optionGroups = parsedPayload.optionGroups;
  }

  if (parsedPayload.categoryId !== undefined) {
    if (parsedPayload.categoryId === null) {
      existingProduct.set('categoryId', undefined);
    } else {
      existingProduct.categoryId = parsedPayload.categoryId;
    }
  }

  if (parsedPayload.categoryName !== undefined) {
    if (parsedPayload.categoryName === null) {
      existingProduct.set('categoryName', undefined);
    } else {
      existingProduct.categoryName = parsedPayload.categoryName;
    }
  }

  if (parsedPayload.subCategoryId !== undefined) {
    if (parsedPayload.subCategoryId === null) {
      existingProduct.set('subCategoryId', undefined);
    } else {
      existingProduct.subCategoryId = parsedPayload.subCategoryId;
    }
  }

  if (parsedPayload.subCategoryName !== undefined) {
    if (parsedPayload.subCategoryName === null) {
      existingProduct.set('subCategoryName', undefined);
    } else {
      existingProduct.subCategoryName = parsedPayload.subCategoryName;
    }
  }

  await existingProduct.save();

  return mapProductToDTO(existingProduct);
};

export const deleteProduct = async (productId: string): Promise<ProductDTO> => {
  const query = buildProductIdentityQuery(productId);
  const deletedProduct = await ProductModel.findOneAndDelete(query);

  if (!deletedProduct) {
    throw createHttpError('Product not found', 404);
  }

  return mapProductToDTO(deletedProduct);
};

export const getProductOptionGroups = async (productId: string): Promise<ProductOptionGroupDTO[]> => {
  const query = buildProductIdentityQuery(productId);
  const product = await ProductModel.findOne(query).lean();

  if (!product) {
    throw createHttpError('Product not found', 404);
  }

  return Array.isArray(product.optionGroups) ? product.optionGroups : [];
};

export const addProductOptionGroup = async (
  productId: string,
  payload: CreateProductOptionGroupPayload,
): Promise<ProductOptionGroupDTO> => {
  const query = buildProductIdentityQuery(productId);
  const product = await ProductModel.findOne(query);

  if (!product) {
    throw createHttpError('Product not found', 404);
  }

  const existingGroups = Array.isArray(product.optionGroups) ? [...product.optionGroups] : [];
  const parsedGroup = parseOptionGroupCreatePayload(payload, 'optionGroup');

  let uniqueGroupId = parsedGroup.id;
  if (findOptionGroupIndex(existingGroups, uniqueGroupId) !== -1) {
    let suffix = 1;
    while (findOptionGroupIndex(existingGroups, `${parsedGroup.id}-${suffix}`) !== -1) {
      suffix += 1;
    }

    uniqueGroupId = `${parsedGroup.id}-${suffix}`;
  }

  const optionGroupToAdd: ProductOptionGroupDTO = {
    ...parsedGroup,
    id: uniqueGroupId,
  };

  existingGroups.push(optionGroupToAdd);
  product.optionGroups = existingGroups;

  await product.save();

  return optionGroupToAdd;
};

export const updateProductOptionGroupInProduct = async (
  productId: string,
  optionGroupId: string,
  payload: UpdateProductOptionGroupPayload,
): Promise<ProductOptionGroupDTO> => {
  const query = buildProductIdentityQuery(productId);
  const product = await ProductModel.findOne(query);

  if (!product) {
    throw createHttpError('Product not found', 404);
  }

  const parsedOptionGroupId = readOptionGroupIdParam(optionGroupId);
  const existingGroups = Array.isArray(product.optionGroups) ? [...product.optionGroups] : [];
  const index = findOptionGroupIndex(existingGroups, parsedOptionGroupId);

  if (index === -1) {
    throw createHttpError('Option group not found in product', 404);
  }

  const updateData = parseOptionGroupUpdatePayload(payload);

  if (Object.keys(updateData).length === 0) {
    throw createHttpError('At least one field is required to update option group', 400);
  }

  const currentGroup = existingGroups[index];
  if (!currentGroup) {
    throw createHttpError('Option group not found in product', 404);
  }

  const effectiveType = updateData.type ?? currentGroup.type;
  const effectiveMin = updateData.minSelected ?? currentGroup.minSelected;
  const effectiveMax = updateData.maxSelected ?? currentGroup.maxSelected;

  ensureSelectionBounds(effectiveType, effectiveMin, effectiveMax);

  const updatedGroup: ProductOptionGroupDTO = {
    ...currentGroup,
    ...updateData,
    id: currentGroup.id,
  };

  existingGroups[index] = updatedGroup;
  product.optionGroups = existingGroups;

  await product.save();

  return updatedGroup;
};

export const deleteProductOptionGroupFromProduct = async (
  productId: string,
  optionGroupId: string,
): Promise<ProductOptionGroupDTO> => {
  const query = buildProductIdentityQuery(productId);
  const product = await ProductModel.findOne(query);

  if (!product) {
    throw createHttpError('Product not found', 404);
  }

  const parsedOptionGroupId = readOptionGroupIdParam(optionGroupId);
  const existingGroups = Array.isArray(product.optionGroups) ? [...product.optionGroups] : [];
  const index = findOptionGroupIndex(existingGroups, parsedOptionGroupId);

  if (index === -1) {
    throw createHttpError('Option group not found in product', 404);
  }

  const [removed] = existingGroups.splice(index, 1);
  if (!removed) {
    throw createHttpError('Option group not found in product', 404);
  }

  product.optionGroups = existingGroups;

  await product.save();

  return removed;
};

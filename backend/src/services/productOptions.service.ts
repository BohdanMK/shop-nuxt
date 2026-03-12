import { FilterQuery, Types } from 'mongoose';
import type { ProductOptionGroupDTO, ProductOptionValueDTO } from '../../../shared/dto/product.dto';
import { ProductOptionGroupModel, ProductOptionGroupDocument } from '../models/ProductOptionGroup';

export type CreateProductOptionGroupPayload = Omit<ProductOptionGroupDTO, 'id'> & {
  id?: string;
};

export type UpdateProductOptionGroupPayload = Partial<Omit<ProductOptionGroupDTO, 'id'>>;

type ProductOptionGroupType = 'single' | 'multiple';

type OptionGroupPlain = {
  id: string;
  name: string;
  type: ProductOptionGroupType;
  required?: boolean;
  minSelected?: number;
  maxSelected?: number;
  values?: ProductOptionValueDTO[];
};

type ParsedCreatePayload = {
  id?: string;
  name: string;
  type: ProductOptionGroupType;
  required: boolean;
  minSelected?: number;
  maxSelected?: number;
  values: ProductOptionValueDTO[];
};

type ParsedUpdatePayload = {
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

const readOptionGroupType = (value: unknown): ProductOptionGroupType => {
  if (value !== 'single' && value !== 'multiple') {
    throw createHttpError('type must be "single" or "multiple"', 400);
  }

  return value;
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const parseExtraPrice = (
  value: unknown,
  field: string,
): NonNullable<ProductOptionValueDTO['extraPrice']> => {
  if (typeof value === 'number') {
    if (!Number.isFinite(value) || value < 0) {
      throw createHttpError(`${field} must be a non-negative number`, 400);
    }

    return { amount: value, currency: 'UAH' };
  }

  if (!isRecord(value)) {
    throw createHttpError(`${field} must be a number or an object`, 400);
  }

  const currency = value.currency === undefined ? 'UAH' : value.currency;
  if (currency !== 'UAH') {
    throw createHttpError(`${field}.currency must be UAH`, 400);
  }

  if (typeof value.amount !== 'number' || !Number.isFinite(value.amount) || value.amount < 0) {
    throw createHttpError(`${field}.amount must be a non-negative number`, 400);
  }

  return {
    amount: value.amount,
    currency: 'UAH',
  };
};

const parseOptionValues = (value: unknown): ProductOptionValueDTO[] => {
  if (!Array.isArray(value)) {
    throw createHttpError('values must be an array', 400);
  }

  const usedIds = new Set<string>();

  return value.map((rawValue, index) => {
    if (!isRecord(rawValue)) {
      throw createHttpError(`values[${index}] must be an object`, 400);
    }

    const label = readRequiredString(rawValue.label, `values[${index}].label`);
    const providedId = readOptionalString(rawValue.id, `values[${index}].id`);
    const baseGeneratedId = slugify(label) || `value-${index + 1}`;

    let resolvedId = providedId ?? baseGeneratedId;
    if (providedId && usedIds.has(providedId)) {
      throw createHttpError(`values[${index}].id must be unique`, 400);
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

    const description = readOptionalString(
      rawValue.description,
      `values[${index}].description`,
    );
    if (description !== undefined) {
      parsed.description = description;
    }

    if (rawValue.image !== undefined) {
      if (!isRecord(rawValue.image)) {
        throw createHttpError(`values[${index}].image must be an object`, 400);
      }

      const src = readRequiredString(rawValue.image.src, `values[${index}].image.src`);
      const image: NonNullable<ProductOptionValueDTO['image']> = {
        src,
      };
      parsed.image = image;
    }

    if (rawValue.extraPrice !== undefined) {
      parsed.extraPrice = parseExtraPrice(rawValue.extraPrice, `values[${index}].extraPrice`);
    }

    if (rawValue.components !== undefined) {
      if (!Array.isArray(rawValue.components)) {
        throw createHttpError(`values[${index}].components must be an array`, 400);
      }

      parsed.components = rawValue.components.map((rawComponent, componentIndex) => {
        if (!isRecord(rawComponent)) {
          throw createHttpError(
            `values[${index}].components[${componentIndex}] must be an object`,
            400,
          );
        }

        if (!isRecord(rawComponent.image)) {
          throw createHttpError(
            `values[${index}].components[${componentIndex}].image must be an object`,
            400,
          );
        }

        return {
          name: readRequiredString(
            rawComponent.name,
            `values[${index}].components[${componentIndex}].name`,
          ),
          image: {
            src: readRequiredString(
              rawComponent.image.src,
              `values[${index}].components[${componentIndex}].image.src`,
            ),
          },
        };
      });
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

const parseCreatePayload = (payload: CreateProductOptionGroupPayload): ParsedCreatePayload => {
  const rawPayload = payload as unknown;
  if (!isRecord(rawPayload)) {
    throw createHttpError('Payload must be an object', 400);
  }

  const parsed: ParsedCreatePayload = {
    name: readRequiredString(rawPayload.name, 'name'),
    type: readOptionGroupType(rawPayload.type),
    required:
      rawPayload.required === undefined ? false : readBoolean(rawPayload.required, 'required'),
    values: rawPayload.values === undefined ? [] : parseOptionValues(rawPayload.values),
  };

  const customId = readOptionalString(rawPayload.id, 'id');
  if (customId !== undefined) {
    parsed.id = customId;
  }

  if (rawPayload.minSelected !== undefined) {
    parsed.minSelected = readNonNegativeInteger(rawPayload.minSelected, 'minSelected');
  }

  if (rawPayload.maxSelected !== undefined) {
    parsed.maxSelected = readNonNegativeInteger(rawPayload.maxSelected, 'maxSelected');
  }

  ensureSelectionBounds(parsed.type, parsed.minSelected, parsed.maxSelected);

  return parsed;
};

const parseUpdatePayload = (payload: UpdateProductOptionGroupPayload): ParsedUpdatePayload => {
  const rawPayload = payload as unknown;
  if (!isRecord(rawPayload)) {
    throw createHttpError('Payload must be an object', 400);
  }

  const parsed: ParsedUpdatePayload = {};

  if ('name' in rawPayload) {
    parsed.name = readRequiredString(rawPayload.name, 'name');
  }

  if ('type' in rawPayload) {
    parsed.type = readOptionGroupType(rawPayload.type);
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
    parsed.values = parseOptionValues(rawPayload.values);
  }

  return parsed;
};

const buildOptionGroupIdentityQuery = (
  optionId: string,
): FilterQuery<ProductOptionGroupDocument> => {
  const trimmedId = optionId.trim();
  if (!trimmedId) {
    throw createHttpError('Option id is required', 400);
  }

  if (Types.ObjectId.isValid(trimmedId)) {
    return {
      $or: [{ _id: new Types.ObjectId(trimmedId) }, { id: trimmedId }],
    };
  }

  return { id: trimmedId };
};

const toOptionGroupDTO = (group: OptionGroupPlain): ProductOptionGroupDTO => {
  const dto: ProductOptionGroupDTO = {
    id: String(group.id),
    name: String(group.name),
    type: group.type,
    values: (Array.isArray(group.values) ? group.values : []) as ProductOptionValueDTO[],
  };

  if (group.required !== undefined) {
    dto.required = Boolean(group.required);
  }

  if (group.minSelected !== undefined) {
    dto.minSelected = group.minSelected;
  }

  if (group.maxSelected !== undefined) {
    dto.maxSelected = group.maxSelected;
  }

  return dto;
};

const syncOptionGroupInProducts = async (optionGroup: ProductOptionGroupDTO): Promise<void> => {
  await ProductOptionGroupModel.db.collection('products').updateMany(
    { 'optionGroups.id': optionGroup.id },
    { $set: { 'optionGroups.$[group]': optionGroup } },
    { arrayFilters: [{ 'group.id': optionGroup.id }] },
  );
};

export const listProductOptionGroups = async (): Promise<ProductOptionGroupDTO[]> => {
  const groups = await ProductOptionGroupModel.find().sort({ createdAt: -1 }).lean();
  return groups.map((group) => toOptionGroupDTO(group as unknown as OptionGroupPlain));
};

export const createProductOptionGroup = async (
  payload: CreateProductOptionGroupPayload,
): Promise<ProductOptionGroupDTO> => {
  const parsedPayload = parseCreatePayload(payload);

  if (parsedPayload.id) {
    const exists = await ProductOptionGroupModel.exists({ id: parsedPayload.id });
    if (exists) {
      throw createHttpError('Option group with this id already exists', 409);
    }
  }

  const created = await ProductOptionGroupModel.create(parsedPayload);
  return toOptionGroupDTO(created.toObject() as unknown as OptionGroupPlain);
};

export const getProductOptionGroupById = async (
  optionId: string,
): Promise<ProductOptionGroupDTO> => {
  const query = buildOptionGroupIdentityQuery(optionId);
  const optionGroup = await ProductOptionGroupModel.findOne(query).lean();

  if (!optionGroup) {
    throw createHttpError('Option group not found', 404);
  }

  return toOptionGroupDTO(optionGroup as unknown as OptionGroupPlain);
};

export const updateProductOptionGroup = async (
  optionId: string,
  payload: UpdateProductOptionGroupPayload,
): Promise<ProductOptionGroupDTO> => {
  const query = buildOptionGroupIdentityQuery(optionId);
  const updateData = parseUpdatePayload(payload);

  if (Object.keys(updateData).length === 0) {
    throw createHttpError('At least one field is required to update option group', 400);
  }

  const existing = await ProductOptionGroupModel.findOne(query);
  if (!existing) {
    throw createHttpError('Option group not found', 404);
  }

  const effectiveType = updateData.type ?? existing.type;
  const effectiveMin = updateData.minSelected ?? existing.minSelected;
  const effectiveMax = updateData.maxSelected ?? existing.maxSelected;

  ensureSelectionBounds(effectiveType, effectiveMin, effectiveMax);

  const updated = await ProductOptionGroupModel.findOneAndUpdate(query, updateData, {
    new: true,
  }).lean();

  if (!updated) {
    throw createHttpError('Option group not found', 404);
  }

  const updatedOptionGroup = toOptionGroupDTO(updated as unknown as OptionGroupPlain);
  await syncOptionGroupInProducts(updatedOptionGroup);

  return updatedOptionGroup;
};

export const deleteProductOptionGroup = async (
  optionId: string,
): Promise<ProductOptionGroupDTO> => {
  const query = buildOptionGroupIdentityQuery(optionId);

  const deleted = await ProductOptionGroupModel.findOneAndDelete(query).lean();
  if (!deleted) {
    throw createHttpError('Option group not found', 404);
  }

  const deletedOptionGroup = toOptionGroupDTO(deleted as unknown as OptionGroupPlain);

  await ProductOptionGroupModel.db.collection('products').updateMany(
    { 'optionGroups.id': deletedOptionGroup.id },
    { $pull: { optionGroups: { id: deletedOptionGroup.id } } } as never,
  );

  return deletedOptionGroup;
};

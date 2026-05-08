import { createHttpError } from './httpError';

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

export const readRequiredString = (value: unknown, field: string): string => {
  if (typeof value !== 'string') {
    throw createHttpError(`${field} must be a string`, 400);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    throw createHttpError(`${field} is required`, 400);
  }

  return trimmed;
};

export const readOptionalString = (value: unknown, field: string): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== 'string') {
    throw createHttpError(`${field} must be a string`, 400);
  }

  const trimmed = value.trim();
  return trimmed || undefined;
};

export const readBoolean = (value: unknown, field: string): boolean => {
  if (typeof value !== 'boolean') {
    throw createHttpError(`${field} must be a boolean`, 400);
  }

  return value;
};

export const readNonNegativeInteger = (value: unknown, field: string): number => {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
    throw createHttpError(`${field} must be a non-negative integer`, 400);
  }

  return value;
};

// Unicode-aware slugify: removes accents, lowercases, replaces non-alphanumeric with hyphens.
// Returns empty string if input produces no valid characters — callers provide their own fallback.
export const slugify = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

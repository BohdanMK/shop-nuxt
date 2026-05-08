import { FilterQuery, Types } from 'mongoose';
import type { Location } from '../dtos/locations.dto';
import { LocationDocument, LocationModel } from '../models/Location';
import { createHttpError } from '../utils/httpError';
import { readRequiredString, readOptionalString } from '../utils/parsing';

export interface CreateLocationPayload {
  id?: number;
  name: string;
  locationType: Location['locationType'];
  lat: number;
  lng: number;
  mainImg: Location['mainImg'];
  address?: string;
  description?: string;
  mapStyle?: string;
  images?: string[];
  schedule?: string;
  contactPhones?: Location['contactPhones'];
}

export interface UpdateLocationPayload {
  name?: string;
  locationType?: Location['locationType'];
  lat?: number;
  lng?: number;
  mainImg?: Location['mainImg'];
  address?: string;
  description?: string;
  mapStyle?: string;
  images?: string[];
  schedule?: string;
  contactPhones?: Location['contactPhones'];
}

export interface GetAdminLocationsOptions {
  page?: number;
  limit?: number;
  sortBy?: 'id' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  search?: string;
  locationType?: Location['locationType'];
}

export interface PaginatedLocations {
  items: LocationDocument[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const readNumber = (value: unknown, field: string): number => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw createHttpError(`${field} must be a valid number`, 400);
  }

  return value;
};

const readOptionalStringArray = (value: unknown, field: string): string[] | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw createHttpError(`${field} must be an array`, 400);
  }

  return value.map((item, index) => readRequiredString(item, `${field}[${index}]`));
};

const readContactPhoneItem = (value: unknown, field: string): { value: string } => {
  if (typeof value === 'string') {
    return { value: readRequiredString(value, field) };
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw createHttpError(`${field} must be an object with string field "value"`, 400);
  }

  const maybePhone = value as { value?: unknown };
  return {
    value: readRequiredString(maybePhone.value, `${field}.value`),
  };
};

const readOptionalContactPhoneArray = (
  value: unknown,
  field: string,
): { value: string }[] | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw createHttpError(`${field} must be an array`, 400);
  }

  return value.map((item, index) => readContactPhoneItem(item, `${field}[${index}]`));
};

const readRequiredMainImage = (value: unknown): Location['mainImg'] => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw createHttpError('mainImg must be an object', 400);
  }

  const maybeMainImg = value as { src?: unknown; alt?: unknown };

  return {
    src: readRequiredString(maybeMainImg.src, 'mainImg.src'),
    alt: readRequiredString(maybeMainImg.alt, 'mainImg.alt'),
  };
};

const readLocationType = (value: unknown): Location['locationType'] => {
  if (value !== 'restaurant' && value !== 'pickup') {
    throw createHttpError('locationType must be "restaurant" or "pickup"', 400);
  }

  return value;
};

const buildLocationIdentityQuery = (locationId: string): FilterQuery<LocationDocument> => {
  const trimmedId = locationId.trim();
  if (!trimmedId) {
    throw createHttpError('Location id is required', 400);
  }

  if (/^\d+$/.test(trimmedId)) {
    return { id: Number(trimmedId) };
  }

  if (Types.ObjectId.isValid(trimmedId)) {
    return { _id: new Types.ObjectId(trimmedId) };
  }

  throw createHttpError('Invalid location id', 400);
};

const getNextLocationId = async (): Promise<number> => {
  const lastLocation = await LocationModel.findOne().sort({ id: -1 }).select({ id: 1 }).lean();
  return (lastLocation?.id ?? 0) + 1;
};

const normalizeMainImg = (mainImg: unknown): Location['mainImg'] => {
  if (typeof mainImg === 'string') {
    const trimmed = mainImg.trim();
    const fallbackAlt = trimmed.split('/').pop() || 'location image';

    return {
      src: trimmed,
      alt: fallbackAlt,
    };
  }

  return readRequiredMainImage(mainImg);
};

const normalizeContactPhones = (value: unknown): { value: string }[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      try {
        return readContactPhoneItem(item, 'contactPhones');
      } catch {
        return undefined;
      }
    })
    .filter((item): item is { value: string } => Boolean(item));
};

const normalizeLocationDoc = (location: LocationDocument): LocationDocument => {
  const normalizedMainImg = normalizeMainImg((location as unknown as { mainImg?: unknown }).mainImg);
  const normalizedContactPhones = normalizeContactPhones(
    (location as unknown as { contactPhones?: unknown }).contactPhones,
  );

  return {
    ...location,
    mainImg: normalizedMainImg,
    contactPhones: normalizedContactPhones,
  } as LocationDocument;
};

class LocationService {
  async getAllLocations(): Promise<LocationDocument[]> {
    const locations = await LocationModel.find().sort({ id: 1 }).lean();
    return locations.map(normalizeLocationDoc);
  }

  async getAdminLocations(options: GetAdminLocationsOptions = {}): Promise<PaginatedLocations> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy ?? 'createdAt';
    const sortOrder = options.sortOrder === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (options.search) {
      filter.$or = [
        { name: { $regex: options.search, $options: 'i' } },
        { address: { $regex: options.search, $options: 'i' } },
      ];
    }

    if (options.locationType) {
      filter.locationType = options.locationType;
    }

    const [items, total] = await Promise.all([
      LocationModel.find(filter).sort({ [sortBy]: sortOrder }).skip(skip).limit(limit).lean(),
      LocationModel.countDocuments(filter),
    ]);

    return {
      items: items.map(normalizeLocationDoc),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getLocationById(locationId: string): Promise<LocationDocument> {
    const identityQuery = buildLocationIdentityQuery(locationId);
    const location = await LocationModel.findOne(identityQuery).lean();

    if (!location) {
      throw createHttpError('Location not found', 404);
    }

    return normalizeLocationDoc(location);
  }

  async createLocation(payload: CreateLocationPayload): Promise<LocationDocument> {
    const name = readRequiredString(payload.name, 'name');
    const locationType = readLocationType(payload.locationType);
    const lat = readNumber(payload.lat, 'lat');
    const lng = readNumber(payload.lng, 'lng');
    const mainImg = readRequiredMainImage(payload.mainImg);

    const address = readOptionalString(payload.address, 'address');
    const description = readOptionalString(payload.description, 'description');
    const mapStyle = readOptionalString(payload.mapStyle, 'mapStyle');
    const images = readOptionalStringArray(payload.images, 'images');
    const schedule = readOptionalString(payload.schedule, 'schedule');
    const contactPhones = readOptionalContactPhoneArray(payload.contactPhones, 'contactPhones');

    let id = payload.id;

    if (id !== undefined) {
      if (!Number.isInteger(id) || id <= 0) {
        throw createHttpError('id must be a positive integer', 400);
      }

      const existingById = await LocationModel.findOne({ id }).lean();
      if (existingById) {
        throw createHttpError('Location with this id already exists', 409);
      }
    } else {
      id = await getNextLocationId();
    }

    const createdLocation = await LocationModel.create({
      id,
      name,
      locationType,
      lat,
      lng,
      mainImg,
      ...(address !== undefined && { address }),
      ...(description !== undefined && { description }),
      ...(mapStyle !== undefined && { mapStyle }),
      ...(images !== undefined && { images }),
      ...(schedule !== undefined && { schedule }),
      ...(contactPhones !== undefined && { contactPhones }),
    });

    return normalizeLocationDoc(createdLocation);
  }

  async updateLocation(locationId: string, payload: UpdateLocationPayload): Promise<LocationDocument> {
    const identityQuery = buildLocationIdentityQuery(locationId);

    if (!Object.keys(payload).length) {
      throw createHttpError('At least one field is required to update location', 400);
    }

    const updateData: Record<string, unknown> = {};

    if ('name' in payload) {
      updateData.name = readRequiredString(payload.name, 'name');
    }

    if ('locationType' in payload) {
      updateData.locationType = readLocationType(payload.locationType);
    }

    if ('lat' in payload) {
      updateData.lat = readNumber(payload.lat, 'lat');
    }

    if ('lng' in payload) {
      updateData.lng = readNumber(payload.lng, 'lng');
    }

    if ('mainImg' in payload) {
      updateData.mainImg = readRequiredMainImage(payload.mainImg);
    }

    if ('address' in payload) {
      updateData.address = readOptionalString(payload.address, 'address');
    }

    if ('description' in payload) {
      updateData.description = readOptionalString(payload.description, 'description');
    }

    if ('mapStyle' in payload) {
      updateData.mapStyle = readOptionalString(payload.mapStyle, 'mapStyle');
    }

    if ('images' in payload) {
      updateData.images = readOptionalStringArray(payload.images, 'images');
    }

    if ('schedule' in payload) {
      updateData.schedule = readOptionalString(payload.schedule, 'schedule');
    }

    if ('contactPhones' in payload) {
      updateData.contactPhones = readOptionalContactPhoneArray(payload.contactPhones, 'contactPhones');
    }

    const updatedLocation = await LocationModel.findOneAndUpdate(identityQuery, updateData, {
      new: true,
    }).lean();

    if (!updatedLocation) {
      throw createHttpError('Location not found', 404);
    }

    return normalizeLocationDoc(updatedLocation);
  }

  async deleteLocation(locationId: string): Promise<LocationDocument> {
    const identityQuery = buildLocationIdentityQuery(locationId);
    const deletedLocation = await LocationModel.findOneAndDelete(identityQuery).lean();

    if (!deletedLocation) {
      throw createHttpError('Location not found', 404);
    }

    return normalizeLocationDoc(deletedLocation);
  }
}

export const locationService = new LocationService();

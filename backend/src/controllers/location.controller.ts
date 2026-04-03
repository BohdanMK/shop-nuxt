import type { NextFunction, Request, Response } from 'express';
import { locationService } from '../services/location.service';

export const getLocations = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const locations = await locationService.getAllLocations();
    res.status(200).json(locations);
  } catch (err) {
    next(err);
  }
};

export const getAdminLocations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const sortByRaw = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';
    const search = req.query.search as string | undefined;
    const locationType = req.query.locationType as 'restaurant' | 'pickup' | undefined;

    const allowedSortBy = ['id', 'name', 'createdAt'] as const;
    const sortBy = allowedSortBy.includes(sortByRaw as (typeof allowedSortBy)[number])
      ? (sortByRaw as (typeof allowedSortBy)[number])
      : 'createdAt';

    const locations = await locationService.getAdminLocations({
      page,
      limit,
      sortBy,
      sortOrder,
      ...(search !== undefined && { search }),
      ...(locationType !== undefined && { locationType }),
    });

    res.status(200).json(locations);
  } catch (err) {
    next(err);
  }
};

export const getLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { locationId } = req.params;

    if (!locationId) {
      return res.status(400).json({ message: 'Location id is required' });
    }

    const location = await locationService.getLocationById(locationId);
    res.status(200).json(location);
  } catch (err) {
    next(err);
  }
};

export const createLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const location = await locationService.createLocation({
      id: req.body?.id,
      name: req.body?.name,
      locationType: req.body?.locationType,
      lat: req.body?.lat,
      lng: req.body?.lng,
      mainImg: req.body?.mainImg,
      address: req.body?.address,
      description: req.body?.description,
      mapStyle: req.body?.mapStyle,
      images: req.body?.images,
      schedule: req.body?.schedule,
      contactPhones: req.body?.contactPhones,
    });

    res.status(201).json(location);
  } catch (err) {
    next(err);
  }
};

export const updateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { locationId } = req.params;

    if (!locationId) {
      return res.status(400).json({ message: 'Location id is required' });
    }

    const updatedLocation = await locationService.updateLocation(locationId, {
      name: req.body?.name,
      locationType: req.body?.locationType,
      lat: req.body?.lat,
      lng: req.body?.lng,
      mainImg: req.body?.mainImg,
      address: req.body?.address,
      description: req.body?.description,
      mapStyle: req.body?.mapStyle,
      images: req.body?.images,
      schedule: req.body?.schedule,
      contactPhones: req.body?.contactPhones,
    });

    res.status(200).json(updatedLocation);
  } catch (err) {
    next(err);
  }
};

export const deleteLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { locationId } = req.params;

    if (!locationId) {
      return res.status(400).json({ message: 'Location id is required' });
    }

    const deletedLocation = await locationService.deleteLocation(locationId);
    res.status(200).json(deletedLocation);
  } catch (err) {
    next(err);
  }
};

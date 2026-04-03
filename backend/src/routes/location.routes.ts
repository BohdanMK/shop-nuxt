import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import {
  createLocation,
  deleteLocation,
  getAdminLocations,
  getLocationById,
  getLocations,
  updateLocation,
} from '../controllers/location.controller';

const router = Router();

router.get('/admin', getAdminLocations);
router.get('/admin/:locationId', getLocationById);
router.post('/admin/create', authMiddleware, createLocation);
router.patch('/admin/:locationId/update', authMiddleware, updateLocation);
router.delete('/admin/:locationId/delete', authMiddleware, deleteLocation);

export default router;

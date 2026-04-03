import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { getDashboardInfoController } from '../controllers/dashboard.controller';

const router = Router();

router.get('/admin/stats', authMiddleware,  getDashboardInfoController);

export default router;

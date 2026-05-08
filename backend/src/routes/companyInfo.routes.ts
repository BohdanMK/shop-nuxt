import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import {
  createCompanyInfo,
  getCompanyInfo,
  updateCompanyInfo,
} from '../controllers/companyInfo.controller';

const router = Router();

router.get('/', getCompanyInfo);
router.post('/admin/create', authMiddleware, createCompanyInfo);
router.patch('/admin/update', authMiddleware, updateCompanyInfo);

export default router;

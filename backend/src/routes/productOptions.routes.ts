import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import {
  createProductOption,
  deleteProductOption,
  getProductOptionById,
  listProductOptions,
  updateProductOption,
} from '../controllers/productOptions.controller';

const router = Router();

router.get('/admin', authMiddleware, listProductOptions);
router.post('/admin/create', authMiddleware, createProductOption);
router.patch('/admin/:optionId/update', authMiddleware, updateProductOption);
router.delete('/admin/:optionId/delete', authMiddleware, deleteProductOption);
router.get('/admin/:optionId', authMiddleware, getProductOptionById);

export default router;

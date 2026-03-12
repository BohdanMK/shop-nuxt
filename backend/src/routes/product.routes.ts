import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import {
	addProductOptionGroupHandler,
	createProductHandler,
	deleteProductHandler,
	deleteProductOptionGroupHandler,
	getProductByIdHandler,
	getProductOptionGroupsHandler,
	getProductsHandler,
	updateProductHandler,
	updateProductOptionGroupHandler,
} from '../controllers/product.controller';

const router = Router();

router.get('/', getProductsHandler);
router.get('/admin', authMiddleware, getProductsHandler);
router.get('/admin/:productId', authMiddleware, getProductByIdHandler);
router.post('/admin/create', authMiddleware, createProductHandler);
router.patch('/admin/:productId/update', authMiddleware, updateProductHandler);
router.delete('/admin/:productId/delete', authMiddleware, deleteProductHandler);

router.get('/admin/:productId/optionGroups', authMiddleware, getProductOptionGroupsHandler);
router.post('/admin/:productId/optionGroups/add', authMiddleware, addProductOptionGroupHandler);
router.patch(
	'/admin/:productId/optionGroups/:optionGroupId/update',
	authMiddleware,
	updateProductOptionGroupHandler,
);
router.delete(
	'/admin/:productId/optionGroups/:optionGroupId/delete',
	authMiddleware,
	deleteProductOptionGroupHandler,
);

router.get('/:productId/optionGroups', getProductOptionGroupsHandler);
router.get('/:productId', getProductByIdHandler);

export default router;

import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/category.controller';
import {
	createSubCategory,
	deleteSubCategory,
	getSubCategories,
	updateSubCategory,
} from '../controllers/subCategory.controller';

const router = Router();

// GET /categories
router.get('/', getCategories);
router.get('/admin', authMiddleware,  getCategories);
router.post('/admin/create', authMiddleware, createCategory);
router.patch('/admin/:categoryId/update', authMiddleware, updateCategory);
router.delete('/admin/:categoryId/delete', authMiddleware, deleteCategory);
router.post('/admin/:categoryId/subcategories/create', authMiddleware, createSubCategory);
router.patch('/admin/:categoryId/subcategories/:subCategoryId/update', authMiddleware, updateSubCategory);
router.delete('/admin/:categoryId/subcategories/:subCategoryId/delete', authMiddleware, deleteSubCategory);
router.get('/:categoryId/subCategories', getSubCategories);
router.get('/admin/:categoryId', authMiddleware, getCategoryById);

export default router;
import { Router } from 'express';
import { getCategories } from '../controllers/category.controller';
import { getSubCategories } from '../controllers/subCategory.controller';

const router = Router();

// GET /categories
router.get('/', getCategories);
router.get('/:categoryId/subCategories', getSubCategories);

export default router;
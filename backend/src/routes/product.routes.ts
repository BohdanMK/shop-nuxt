import { Router } from 'express';
import { getProductsHandler } from '../controllers/product.controller';

const router = Router();

router.get('/', getProductsHandler);

export default router;

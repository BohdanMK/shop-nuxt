import { Router } from "express";
import productRoutes from './product.routes';
import categoryRoutes from './category.routes';
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes'



const router = Router();

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);


export default router;
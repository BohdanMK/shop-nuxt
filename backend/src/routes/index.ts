import { Router } from "express";
import productRoutes from './product.routes';
import categoryRoutes from './category.routes';
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes'
import authRoutes from './auth.routers';
import profileRoutes from './profile.routes';
import uploadsRoutes from './uploads.routes';
import productOptionsRoutes from './productOptions.routes';



const router = Router();

router.use('/products', productRoutes);
router.use('/product', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/uploads', uploadsRoutes);
router.use('/product-options', productOptionsRoutes);

export default router;
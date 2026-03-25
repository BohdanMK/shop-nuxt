import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { createOrderController, getAllOrdersController, updateOrderStatusController } from "../controllers/order.controller";

const router = Router();

router.get('/admin/all', authMiddleware, getAllOrdersController);
router.patch('/admin/:orderId/status', authMiddleware, updateOrderStatusController);
router.post('/create', createOrderController);

export default router;
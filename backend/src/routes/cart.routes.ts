import { Router } from 'express';
import { getCartController, addToCartController, deleteCartItemController, updateCartItemController, removeItemFromCartController } from '../controllers/cart.controller';

const router = Router();

router.get('/', getCartController);
router.post('/add', addToCartController);
router.post('/item/decrease', deleteCartItemController);
router.post('/item/increase', updateCartItemController);
router.post('/item/delete', removeItemFromCartController);

export default router;

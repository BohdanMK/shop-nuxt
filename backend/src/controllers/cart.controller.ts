import { Request, Response, NextFunction } from 'express';
import { getCart, addItemToCart, deleteCartItem, updateCartItem, removeCartItem } from '../services/cart.service';

export const getCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = req.cookies?.cartId;
    const cart = await getCart(cartId);

    if (!cart) {
      return res.status(200).json(null);
    }

    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const addToCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = req.cookies?.cartId;

    const updatedCart = await addItemToCart({
      cartId,
      productId: req.body.productId,
      quantity: req.body.quantity,
      selectedOptions: req.body.selectedOptions
    });

    // якщо cookie ще немає — встановлюємо
    if (!cartId) {
      res.cookie('cartId', updatedCart._id as string, {
        httpOnly: true,
        sameSite: 'lax'
      });
    }

    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
};

export const updateCartItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = req.cookies?.cartId;

    const updatedCart = await updateCartItem({
      cartId,
      cartItemId: req.body.cartItemId,
      quantity: req.body.quantity
    });


    if (!cartId) {
      res.cookie('cartId', updatedCart._id as string, {
        httpOnly: true,
        sameSite: 'lax'
      });
    }

    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
};

/* ───────── decrement / delete item ───────── */
export const deleteCartItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = req.cookies?.cartId;
    if (!cartId) {
      return res.status(200).json(null);
    }

    const updatedCart = await deleteCartItem({
      cartId,
      cartItemId: req.body.cartItemId,
      quantity: req.body.quantity ?? 1
    });

    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
};

export const removeItemFromCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = req.cookies?.cartId;
    if (!cartId) {
      return res.status(200).json(null);
    }

    const updatedCart = await removeCartItem({
      cartId,
      cartItemId: req.body.cartItemId,
      quantity: req.body.quantity ?? 1
    });

    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
};
import { Request, Response, NextFunction } from 'express';
import { createOrder } from '../services/order.service';

export const createOrderController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cartId = req.cookies?.cartId;
        const checkOutData = req.body;

        const orderCreate = await createOrder({ cartId, ...checkOutData });

        res.clearCookie('cartId', { path: '/', httpOnly: true });

        res.status(200).json(orderCreate);
    } catch (err) {
        next(err);
    }

}
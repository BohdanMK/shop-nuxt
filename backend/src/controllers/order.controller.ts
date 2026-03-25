import { Request, Response, NextFunction } from 'express';
import { createOrder, getAllOrders, updateOrderStatus } from '../services/order.service';

export const getAllOrdersController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            status,
            dateFrom,
            dateTo,
            page,
            limit,
            name,
            phone,
            cityName,
        } = req.query;

        const allowedStatuses = ['pending', 'confirmed', 'processing'] as const;
        const filters: Parameters<typeof getAllOrders>[0] = {};

        if (typeof status === 'string' && allowedStatuses.includes(status as (typeof allowedStatuses)[number])) {
            filters.status = status as (typeof allowedStatuses)[number];
        }

        if (typeof dateFrom === 'string') {
            filters.dateFrom = new Date(dateFrom);
        }

        if (typeof dateTo === 'string') {
            filters.dateTo = new Date(dateTo);
        }

        if (typeof page === 'string') {
            filters.page = Number(page);
        }

        if (typeof limit === 'string') {
            filters.limit = Number(limit);
        }

        if (typeof name === 'string') {
            filters.name = name;
        }

        if (typeof phone === 'string') {
            filters.phone = phone;
        }

        if (typeof cityName === 'string') {
            filters.cityName = cityName;
        }

        const orders = await getAllOrders(filters);
        res.status(200).json(orders);
    }
    catch (err) {
        next(err);
    }
}

export const updateOrderStatusController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!orderId) {
            return res.status(400).json({ message: 'Order id is required' });
        }

        const allowedStatuses = ['pending', 'confirmed', 'processing'] as const;

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const order = await updateOrderStatus(orderId, status);
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

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
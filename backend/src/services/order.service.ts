import { Types } from 'mongoose';
import { OrderModel, OrderDocument } from '../models/Order';
import { CartModel } from '../models/Cart';
import { CheckoutOrderDTO } from '../dtos/checkOut.dto';

interface OrderFilter {
    status?: 'pending' | 'confirmed' | 'processing';
    dateFrom?: Date;
    dateTo?: Date;
    page?: number;
    limit?: number;
    name?: string;
    phone?: string;
    cityName?: string;
}

interface PaginatedOrders {
    items: OrderDocument[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const getAllOrders = async (filters: OrderFilter): Promise<PaginatedOrders> => {
    const page = filters.page || 1;
    const limit = filters.limit || 10;

    const query = {
        ...(filters.status && { status: filters.status }),
        ...(filters.dateFrom && { date: { $gte: filters.dateFrom } }),
        ...(filters.dateTo && { date: { $lte: filters.dateTo } }),
        ...(filters.name && { name: { $regex: filters.name, $options: 'i' } }),
        ...(filters.phone && { phone: { $regex: filters.phone, $options: 'i' } }),
        ...(filters.cityName && { cityName: { $regex: filters.cityName, $options: 'i' } }),
    };

    const [items, total] = await Promise.all([
        OrderModel.find(query, null, {
            skip: (page - 1) * limit,
            limit,
            sort: { createdAt: -1 },
        }).lean(),
        OrderModel.countDocuments(query),
    ]);

    return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}


export const updateOrderStatus = async (
    orderId: string,
    status: 'pending' | 'confirmed' | 'processing'
): Promise<OrderDocument> => {
    const order = await OrderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    ).lean();

    if (!order) {
        throw new Error('Order not found');
    }

    return order;
};

export const  createOrder = async(data: CheckoutOrderDTO) => {
    const {
        cartId,
        date,
        ...orderData
    } = data;

    if (!cartId) {
        throw new Error('Cart ID is required');
    }

    // find cart
    const cart = await CartModel.findById(cartId);

    if (!cart) {
        throw new Error('Cart not found');
    }

    // create snapshot
    const cartSnapshot = {
        items: cart.items.map((item: any) => ({
            productId: item.productId,
            slug: item.slug,
            title: item.title,
            image: item.image,
            price: item.price,
            salePrice: item.salePrice,
            selectedOptions: item.selectedOptions,
            itemPrice: item.itemPrice,
            quantity: item.quantity
        })),
        totalPrice: cart.totalPrice
    };

    // create order
    const order = await OrderModel.create({
        ...orderData,
        date: new Date(date),
        cartSnapshot
    });

    // delete cart after creteated order
    await CartModel.findByIdAndDelete(cartId);

    return order;
}
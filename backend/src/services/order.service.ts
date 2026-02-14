import { Types } from 'mongoose';
import { OrderModel } from '../models/Order';
import { CartModel } from '../models/Cart';
import { CheckoutOrderDTO } from '../dtos/checkOut.dto';

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
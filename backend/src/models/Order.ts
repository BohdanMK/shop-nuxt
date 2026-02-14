import { Schema, model, Document, Types } from 'mongoose';
import type { CartItemDocument } from './Cart';

export type DeliveryType = 'pickup' | 'delivery';
export type DeliveryTime = 'in_time' | 'nearest_time';

export interface OrderCartItem {
	_id?: Types.ObjectId;
	productId: Types.ObjectId;
	slug?: string;
	title: string;
	image: any;
	price: any;
	itemPrice?: number;
	salePrice?: number;
	selectedOptions?: any[];
	quantity: number;
}

export interface OrderDocument extends Document {
	name: string;
	phone: string;
	street: string;
	house: string;
	cityId?: string;
	cityName?: string;
	deliveryType: DeliveryType;
	deliveryTime: DeliveryTime;
	date: Date;
	time: string;
	birthdayDiscount: boolean;
	comment?: string;
	valuePerson: number;
	agreePolicy: boolean;
	cartSnapshot: {
		items: OrderCartItem[];
		totalPrice: number;
	};
	status: 'pending' | 'confirmed' | 'processing';
}

const OrderCartItemSchema = new Schema<OrderCartItem>(
	{
		productId: { type: Schema.Types.ObjectId, required: true },
		slug: String,
		title: { type: String, required: true },
		image: { type: Object, required: true },
		price: { type: Object, required: true },
		salePrice: Number,
		selectedOptions: { type: Array, default: [] },
		itemPrice: Number,
		quantity: { type: Number, required: true }
	},
	{ _id: true }
);

const OrderSchema = new Schema<OrderDocument>(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true },
		street: { type: String, required: true },
		house: { type: String, required: true },
		cityId: String,
		cityName: String,
		deliveryType: { type: String, enum: ['pickup', 'delivery'], required: true },
		deliveryTime: { type: String, enum: ['in_time', 'nearest_time'], required: true },
		date: { type: Date, required: true },
		time: { type: String, required: true },
		birthdayDiscount: { type: Boolean, default: false },
		comment: String,
		valuePerson: { type: Number, default: 1 },
		agreePolicy: { type: Boolean, required: true },
		cartSnapshot: {
			items: { type: [OrderCartItemSchema], default: [] },
			totalPrice: { type: Number, default: 0 }
		},
		status: { type: String, enum: ['pending', 'confirmed', 'processing'], default: 'pending' }
	},
	{ timestamps: true }
);

export const OrderModel = model<OrderDocument>('Order', OrderSchema);

import { Schema, model, Document, Types } from 'mongoose';
import type { CartDTO, CartItemDTO } from '../dtos/cart.dto';

export interface CartItemDocument extends Document {
  _id: Types.ObjectId;
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
export interface CartDocument extends Document {
  items: Types.DocumentArray<CartItemDocument>;
  totalPrice: number;
}

const CartItemSchema = new Schema<CartItemDocument>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
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

const CartSchema = new Schema<CartDocument>(
  {
    items: { type: [CartItemSchema], default: [] },
    totalPrice: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const CartModel = model<CartDocument>('Cart', CartSchema);

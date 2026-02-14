import { Types } from 'mongoose';
import { CartModel, CartDocument, CartItemDocument } from '../models/Cart';
import { ProductModel } from '../models/Product';
import type { ProductOptionGroupDTO, ProductOptionValueDTO } from '../dtos/product.dto';

interface CartItemOptions {
  id: string;
  label: string;
  extraPrice?: {
    amount: number;
    currency: 'UAH';
  };
  components?: [{
    name: string;
    image: {
      src: string;
      alt?: string;
    };
  }];
}

/* ───────── types ───────── */
export type AddItemInput = {
  cartId?: string;
  productId: string;
  selectedOptions?: CartItemOptions[];
  quantity?: number;
};

export type UpdateCartItemInput = {
  cartId: string;
  cartItemId: string;
  quantity: number;
};

/* ───────── get cart (не створює) ───────── */
export async function getCart(cartId?: string): Promise<CartDocument | null> {

    if (!cartId || !Types.ObjectId.isValid(cartId)) return null;
     console.log('Getting cart with ID:', cartId);
    return CartModel.findById(cartId);
}

/* ───────── create cart ───────── */
export async function createCart(): Promise<CartDocument> {
  return CartModel.create({
    items: [],
    totalPrice: 0
  });
}

/* ───────── add item (створює корзину, якщо нема) ───────── */
export async function addItemToCart(
  input: AddItemInput
): Promise<CartDocument> {
  // отримуємо корзину, або створюємо, якщо немає
  let cart = (await getCart(input.cartId)) ?? (await createCart());

  const product = await ProductModel.findById(input.productId);
  if (!product) throw new Error('Product not found');

  const quantity = input.quantity ?? 1;
  const productObjectId = product._id as Types.ObjectId;

  const itemPrice = (product.salePrice ?? product.price?.amount ?? 0) +
  (input.selectedOptions?.reduce((sum, opt) => sum + (opt.extraPrice?.amount ?? 0), 0) ?? 0);

  const existingItem = cart.items.find(item =>
    isSameCartItem(item, productObjectId, input.selectedOptions)
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId: productObjectId,
      slug: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      itemPrice,
      selectedOptions: input.selectedOptions ?? [],
      quantity,
      ...(product.salePrice !== undefined && {
        salePrice: product.salePrice
      })
    });
  }

  cart.totalPrice = calculateTotal(cart.items);
  await cart.save();

  return cart;
}

/* delete item */

export async function deleteCartItem(
  input: UpdateCartItemInput
): Promise<CartDocument> {
  const cart = await getCart(input.cartId);
  if (!cart) throw new Error('Cart not found');

  const quantity = Number(input.quantity ?? 1);
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error('Invalid quantity');
  }

  // шукаємо елемент корзини по _id
  const item = cart.items.id(input.cartItemId);
  const index = cart.items.findIndex(item => item._id.toString() === input.cartItemId);
  if (!item) {
    throw new Error(`Cart item not found: ${input.cartItemId}`);
  }

  if (item.quantity > quantity) {
    item.quantity -= quantity;
  } else {
    cart.items.splice(index, 1);
  }

  cart.totalPrice = calculateTotal(cart.items);
  await cart.save();

  return cart;
}

/* ───────── update item ───────── */
export async function updateCartItem(
  input: UpdateCartItemInput
): Promise<CartDocument> {
  const cart = await getCart(input.cartId);
  if (!cart) throw new Error('Cart not found');

  const quantity = Number(input.quantity);

  // if (!Number.isInteger(quantity) || quantity < 1) {
  //   throw new Error('Invalid quantity');
  // }

  const item = cart.items.id(input.cartItemId);
  if (!item) {
    throw new Error(`Cart item not found: ${input.cartItemId}`);
  }

  item.quantity += 1;

  cart.totalPrice = calculateTotal(cart.items);
  await cart.save();

  return cart;
}

/* ───────── remove item ───────── */
export async function removeCartItem(
  input: UpdateCartItemInput
): Promise<CartDocument> {
  const cart = await getCart(input.cartId);
  if (!cart) throw new Error('Cart not found');

  const item = cart.items.id(input.cartItemId);
  const index = cart.items.findIndex(item => item._id.toString() === input.cartItemId);
  if (!item) {
    throw new Error(`Cart item not found: ${input.cartItemId}`);
  }

  cart.items.splice(index, 1);

  cart.totalPrice = calculateTotal(cart.items);
  await cart.save();


  return cart;
}

/* ───────── helpers ───────── */
function calculateTotal(items: CartItemDocument[]): number {
  return items.reduce((sum, item) => {
    const quantity = Number(item.quantity);
    if (!Number.isFinite(quantity)) return sum;

    const basePrice = Number(item.salePrice ?? item.price?.amount ?? 0);

    const optionsExtra =
      item.selectedOptions?.reduce(
        (vSum: number, v: { extraPrice?: { amount?: number } }) =>
          vSum + Number(v.extraPrice?.amount ?? 0),
        0
      ) ?? 0;

    return sum + (basePrice + optionsExtra) * quantity;
  }, 0);
}

function isSameCartItem(
  item: CartItemDocument,
  productId: Types.ObjectId,
  selectedOptions?: CartItemOptions[]
): boolean {
  const sortedItemOptions = (item.selectedOptions ?? []).sort((a: any, b: any) => (a.id || '').localeCompare(b.id || ''));
  const sortedInputOptions = (selectedOptions ?? []).sort((a: any, b: any) => (a.id || '').localeCompare(b.id || ''));

  return (
    item.productId.equals(productId) &&
    JSON.stringify(sortedItemOptions) === JSON.stringify(sortedInputOptions)
  );
}

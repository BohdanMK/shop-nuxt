// shared/dto/cart.ts
import type { ImageDTO, PriceDTO, ProductOptionGroupDTO } from './product.dto';

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

export interface CartItemDTO {
    _id?: string;
    productId: string;
    slug?: string;
    title: string;
    image: ImageDTO;
    price: PriceDTO;
    salePrice?: number;
    selectedOptions?: CartItemOptions[];
    quantity: number;
}

export interface CartDTO {
    id: string;
    items: CartItemDTO[];
    totalPrice: number;
}
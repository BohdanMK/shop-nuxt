

export interface CheckoutOrderDTO {
    cartId?: string;
    name: string;
    phone: string;
    street: string;
    house: string;
    cityId?: string;
    cityName?: string;
    deliveryType: 'pickup' | 'delivery';
    deliveryTime: 'in_time' | 'nearest_time';
    date: Date | string;
    time: string;
    birthdayDiscount: boolean;
    comment?: string;
    valuePerson: number;
    agreePolicy: boolean;
}

export interface CheckoutOrderPayload extends CheckoutOrderDTO {
  date: string; // ISO string (YYYY-MM-DD)
  time: string; // HH:mm:ss
}

export interface CheckoutOrderResponse {
    orderId: string;
    status: 'pending' | 'confirmed' | 'processing';
    message: string;
    createdAt: string;
}

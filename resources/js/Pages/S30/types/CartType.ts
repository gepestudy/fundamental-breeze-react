export interface Cart {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
    weight: number;
    created_at: string;
    updated_at: string;
    pivot: CartPivot;
}

export interface CartPivot {
    user_id: number;
    cart_id: number;
}


export type CartItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	type: string;
	size: number;
	count: number;
}

export type cartSliceState = {
	totalPrice: number;
	items: CartItem[];
}
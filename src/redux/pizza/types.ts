export type PizzaProps = {
	category: number;
	id: string;
	imageUrl: string;
	price: number;
	rating: number;
	sizes: number[];
	title: string;
	types: number[];
}

export type SearchPizzaParams = {
	order: string;
	sortBy: string;
	category: string;
	search: string;
	currentPage: string;
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'completed',
	ERROR = 'error'
}


export type pizzasSliceState = {
	items: any
	status: Status;
}
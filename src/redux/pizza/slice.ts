import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { PizzaProps, SearchPizzaParams, Status, pizzasSliceState } from './types';

const initialState: pizzasSliceState = {
	items: [],
	status: Status.LOADING,
}

export const pizzasSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING;
			state.items = [];
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		})
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
		})
	}
})

export const fetchPizzas = createAsyncThunk<PizzaProps[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { order,
			sortBy,
			category,
			search, currentPage } = params
		const { data } = await axios.get<PizzaProps[]>(
			`https://6731af837aaf2a9aff1190b5.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
		);
		return data;
	},
)

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer; 
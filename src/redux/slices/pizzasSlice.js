import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { order,
			sortBy,
			category,
			search, currentPage } = params
		const { data } = await axios.get(
			`https://6731af837aaf2a9aff1190b5.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
		);
		return data
	},
)


const initialState = {
	items: [],
	status: 'loading',
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
			state.status = 'loading';
			state.items = [];
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		})
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = 'error';
			state.items = [];
		})
	}
})

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer; 
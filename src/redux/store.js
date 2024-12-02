import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import filters from './slices/filterSlice';
import pizza from './slices/pizzasSlice';
export const store = configureStore({
	reducer: {
		filters, cart, pizza,
	},
})

// хранилище данных, в данный момент у нас тут reducer всей фильтрации

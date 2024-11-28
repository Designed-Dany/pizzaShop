import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import filters from './slices/filterSlice';
export const store = configureStore({
	reducer: {
		filters, cart,
	},
})

// хранилище данных, в данный момент у нас тут reducer всей фильтрации

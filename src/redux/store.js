import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/filterSlice';

export const store = configureStore({
	reducer: {
		filters,
	},
})

// хранилище данных, в данный момент у нас тут reducer всей фильтрации

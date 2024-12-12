import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cart from './slices/cartSlice';
import filters from './slices/filterSlice';
import pizza from './slices/pizzasSlice';

export const store = configureStore({
	reducer: {
		filters, cart, pizza,
	},
})
export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store;
// хранилище данных, в данный момент у нас тут reducer всей фильтрации

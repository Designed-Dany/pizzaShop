import React, { Suspense } from "react";
import Home from "./pages/Home";
import "./scss/app.scss";

import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Вариант использования ленивой подгрузки компонента, с помощью библиотеки Loadable

// const Cart = Loadable({
// 	loader: () => import('./pages/Cart'),
// 	loading: () => <div>123213</div>,
// });

const Cart = React.lazy(() => import('./pages/Cart'));

const NotFound = React.lazy(() => import('./pages/NotFound'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="" element={<Home />}></Route>
					<Route path="cart" element={<Suspense><Cart /></Suspense>}></Route>
					<Route path="pizza/:id" element={<Suspense><FullPizza /></Suspense>} />
					<Route path="*" element={<Suspense fallback={<div>Идет загрузка...</div>}><NotFound /></Suspense>}></Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;

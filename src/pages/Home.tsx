import React from "react";

import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Sort, { list } from "../components/Sort";
import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

const Home: React.FC = () => {
	const navigation = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { items, status } = useSelector(selectPizzaData);
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter);
	const sortType = sort.sortProperty;

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	// функция запроса пицц
	const getPizzas = () => {
		const order = sortType.includes("-") ? "asc" : "desc"; // если в выборе сортировки есть минус,
		// тогда сортировать снизу вверх, а если нет, то наоборот.
		const sortBy = sortType.replace("-", ""); // удалить минус из выбора сортировки
		const category = categoryId > 0 ? `category=${categoryId}` : ""; // если категория которую мы выбрали больше "Все пиццы",
		//тогда вставь текущую категорию, иначе оставь пустую строку
		const search = searchValue ? `&search=${searchValue}` : ""; // если в поиске есть текст тогда вставляем строчку в запрос, иначе пустая строка


		dispatch(
			// @ts-ignore
			fetchPizzas({
				order,
				sortBy,
				category,
				search,
				currentPage,
			})
		);
	};

	// изначально isMounted false при первом рендере если ничего не изменилось,
	// то он не вшывает ссылку, если изменилось, то он делает isMounted = true и выполняет вшытие,
	// также с помощью navigation вшываем знак вопроса в ссылку, иначе без нее она не работает.
	React.useEffect(() => {
		if (isMounted.current) {
			// превращаем параметры в строчку, чтобы после вшыть в адресную строку
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			navigation(`?${queryString}`); // с помощью хука navigation
			//вшываем строчку из параметров объекта в адресную строку
		}
		isMounted.current = true;
	}, [categoryId, sortType, currentPage]);

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)); // парсим параметры делаем из строчки объект

			const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isSearch.current = true;
			// если мы не делаем при парсинге параметров, isSearch.current = true,
			// тогда при первом рендере делается запрос пицц
		}
	}, []);

	React.useEffect(() => {
		getPizzas();
	}, [categoryId, sortType, searchValue, currentPage]);

	const pizzas = items.map((obj: any) => <Pizza key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === "error" ? (
				<div>
					<div>
						<h2>
							Произошла ошибка <span>😕</span>
						</h2>
						<p>
							Не удалось загрузить пиццы. Попробуйте повторить попытку позже.
						</p>
					</div>
				</div>
			) : (
				<div className="content__items">
					{status === "loading" ? skeletons : pizzas}
				</div>
			)}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;

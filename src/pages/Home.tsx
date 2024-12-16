import React from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Categories, Pagination, Pizza, Skeleton, Sort } from "../components";

import { selectFilter } from '../redux/filter/selectors';
import {
	setCategoryId,
	setCurrentPage
} from "../redux/filter/slice";
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from "../redux/pizza/slice";
import { useAppDispatch } from "../redux/store";


const Home: React.FC = () => {
	const navigation = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { items, status } = useSelector(selectPizzaData);
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter);

	const sortType = sort.sortProperty;

	const onChangeCategory = React.useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const onChangePage = React.useCallback((page: number) => {
		dispatch(setCurrentPage(page));
	}, []);

	// функция запроса пицц
	const getPizzas = () => {
		const order = sortType.includes("-") ? "asc" : "desc"; // если в выборе сортировки есть минус,
		// тогда сортировать снизу вверх, а если нет, то наоборот.
		const sortBy = sortType.replace("-", ""); // удалить минус из выбора сортировки
		const category = categoryId > 0 ? `category=${categoryId}` : ""; // если категория которую мы выбрали больше "Все пиццы",
		//тогда вставь текущую категорию, иначе оставь пустую строку
		const search = searchValue ? `&search=${searchValue}` : ""; // если в поиске есть текст тогда вставляем строчку в запрос, иначе пустая строка


		dispatch(
			fetchPizzas({
				order,
				sortBy,
				category,
				search,
				currentPage: String(currentPage),
			})
		);
	};

	// изначально isMounted false при первом рендере если ничего не изменилось,
	// то он не вшывает ссылку, если изменилось, то он делает isMounted = true и выполняет вшытие,
	// также с помощью navigation вшываем знак вопроса в ссылку, иначе без нее она не работает.
	// React.useEffect(() => {
	// 	if (isMounted.current) {
	// 		const params = { categoryId: categoryId > 0 ? categoryId : null, sortProperty: sort.sortProperty, currentPage }
	// 		// превращаем параметры в строчку, чтобы после вшыть в адресную строку
	// 		const queryString = qs.stringify(params, { skipNulls: true });

	// 		navigation(`?${queryString}`); // с помощью хука navigation
	// 		//вшываем строчку из параметров объекта в адресную строку
	// 	}
	// 	if (!window.location.search) {
	// 		dispatch(fetchPizzas({} as SearchPizzaParams))
	// 	}
	// }, [categoryId, sort.sortProperty, currentPage, searchValue]);

	React.useEffect(() => {
		getPizzas();
	}, [categoryId, sortType, searchValue, currentPage]);

	// React.useEffect(() => {
	// 	if (window.location.search) {
	// 		const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams; // парсим параметры делаем из строчки объект
	// 		const sort = list.find((obj) => obj.sortProperty === params.sortBy);
	// 		dispatch(setFilters({
	// 			searchValue: params.search,
	// 			categoryId: Number(params.category),
	// 			currentPage: Number(params.currentPage),
	// 			sort: sort || list[0],
	// 		}));
	// 		isSearch.current = true;
	// 		// если мы не делаем при парсинге параметров, isSearch.current = true,
	// 		// тогда при первом рендере делается запрос пицц
	// 	}
	// }, []);



	const pizzas = items.map((obj: any) => <Pizza {...obj} />)
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort value={sort} />
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

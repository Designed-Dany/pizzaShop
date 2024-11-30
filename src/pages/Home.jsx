import React from "react";

import axios from "axios";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Sort, { list } from "../components/Sort";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

const Home = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filters
  );
  const sortType = sort.sortProperty;

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< feat
  React.useEffect(() => {
=======
>>>>>>> feat
=======
>>>>>>> feat
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // функция запроса пицц
<<<<<<< HEAD
<<<<<<< HEAD
  const fetchPizzas = () => {
=======
  const fetchPizzas = async () => {
>>>>>>> local
>>>>>>> feat
=======
  const fetchPizzas = () => {
>>>>>>> feat
    setIsLoading(true);

    const order = sortType.includes("-") ? "asc" : "desc"; // если в выборе сортировки есть минус,
    // тогда сортировать снизу вверх, а если нет, то наоборот.
    const sortBy = sortType.replace("-", ""); // удалить минус из выбора сортировки
    const category = categoryId > 0 ? `category=${categoryId}` : ""; // если категория которую мы выбрали больше "Все пиццы",
    //тогда вставь текущую категорию, иначе оставь пустую строку
    const search = searchValue ? `&search=${searchValue}` : ""; // если в поиске есть текст тогда вставляем строчку в запрос, иначе пустая строка

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> feat
    axios
      .get(
        `https://6731af837aaf2a9aff1190b5.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
      )
      .then((res) => {
        setItems(res.data);
<<<<<<< HEAD
=======
<<<<<<< feat
    fetch(
      `https://6731af837aaf2a9aff1190b5.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
>>>>>>> feat
        setIsLoading(false);
      });
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
    window.scrollTo(0, 0);
<<<<<<< HEAD
=======
=======
    // await axios
    //   .get(
    //     `https://6731af837aaf2a9aff1190b5.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //     console.log(1111);
    //   });

    try {
      const res = await axios.get(
        `https://6731af837aaf2a9aff1190b5.mockapi.io/items?page=${currentPage}&it=4&${category}${search}&sortBy=${sortBy}&order=${order}`
      );
      setItems(res.data);
      setIsLoading(false);
      console.log(1111);
    } catch (error) {
      setIsLoading(false);
      console.log("Error found", error);
    }

    console.log(3333);
    window.scrollTo(0, 0);
=======
        setIsLoading(false);
      });
>>>>>>> feat
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
<<<<<<< HEAD
>>>>>>> feat
=======
    window.scrollTo(0, 0);
>>>>>>> feat
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> local
>>>>>>> feat
=======
>>>>>>> feat
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <Pizza key={obj.id} {...obj} />);
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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

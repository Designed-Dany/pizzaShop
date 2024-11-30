import React from "react";

import { SearchContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Sort from "../components/Sort";
const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

<<<<<<< feat
  React.useEffect(() => {
=======
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // функция запроса пицц
  const fetchPizzas = async () => {
>>>>>>> local
    setIsLoading(true);

    const order = sortType.sortProperty.includes("-") ? "asc" : "desc"; // если в выборе сортировки есть минус,
    // тогда сортировать снизу вверх, а если нет, то наоборот.
    const sortBy = sortType.sortProperty.replace("-", ""); // удалить минус из выбора сортировки
    const category = categoryId > 0 ? `category=${categoryId}` : ""; // если категория которую мы выбрали больше "Все пиццы",
    //тогда вставь текущую категорию, иначе оставь пустую строку
    const search = searchValue ? `&search=${searchValue}` : ""; // если в поиске есть текст тогда вставляем строчку в запрос, иначе пустая строка

<<<<<<< feat
    fetch(
      `https://6731af837aaf2a9aff1190b5.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
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
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
>>>>>>> local
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <Pizza key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;

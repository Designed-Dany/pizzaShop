import React from "react";

import Categories from "../components/Categories";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Sort from "../components/Sort";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("https://6731af837aaf2a9aff1190b5.mockapi.io/items")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <Pizza key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;

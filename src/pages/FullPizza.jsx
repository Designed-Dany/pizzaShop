import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6731af837aaf2a9aff1190b5.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log("Пока по этой пицце нету информации", error);
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загрузка";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
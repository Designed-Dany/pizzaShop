import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		imageUrl: string,
		title: string,
		price: number,
	}>();
	const { id } = useParams();
	const navigate = useNavigate();
	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					"https://6731af837aaf2a9aff1190b5.mockapi.io/items/" + id
				);
				setPizza(data);
			} catch (error) {
				alert("Такой пиццы нету в нашем ресторане");
				navigate("/");
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return <>Загрузка...</>
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} alt="" />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} ₽</h4>
			<Link to="/"><button className="button button--outline button--add"><span>Назад</span></button></Link>
		</div>
	);
};

export default FullPizza;

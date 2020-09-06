import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { FaSpinner } from "react-icons/fa";

import Card from "./Card";
import ListCard from "./ListCard";

function Products({ route, title, listCard }) {
	const [products, setProducts] = useState(undefined);

	useEffect(() => {
		if (route) {
			const getProducts = async () => {
				const {
					data: { data },
				} = await Axios.get(route);

				const { products } = data;

				setProducts(products);
			};

			getProducts();
		}
	}, [route]);

	const renderProducts = () => {
		if (!products) {
			return <FaSpinner data-testid='loading' />;
		}

		return (
			<ul className={`Products ${listCard ? "Products--list-card" : ""}`}>
				{products.map((product) =>
					listCard ? (
						<ListCard
							key={product._id}
							className='Products__product'
							data={product}
						/>
					) : (
						<Card
							key={product._id}
							className='Products__product'
							data={product}
						/>
					)
				)}
			</ul>
		);
	};

	return (
		<>
			{title && <h4 className='Products__title'>{title}</h4>}
			{renderProducts()};
		</>
	);
}

Products.propTypes = {
	route: PropTypes.string.isRequired,
	title: PropTypes.string,
	listCard: PropTypes.bool,
};

export default Products;

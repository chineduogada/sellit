import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { FaSpinner } from "react-icons/fa";

import Card from "./Card";
import ListCard from "./ListCard";
import UserContext from "../../context/UserContext";

Axios.interceptors.response.use(null, (err) => {
	const expectedError =
		err.response && err.response.status >= 400 && err.response.status < 500;

	if (!expectedError) {
		// console.log(err);
		// alert("an unexpected error ocurred!");
		return Promise.reject({ ...err, isUnexpected: true });
	}

	if (err.response.status === 404) {
		// console.log(err);
		// alert("an unexpected error ocurred!");
		return Promise.reject({ ...err, isNotFound: true });
	}

	return Promise.reject(err);
});

function Products({ route, title, listCard }) {
	const [data, setData] = useState({
		products: undefined,
		count: 0,
	});
	const { setGlobalErr } = useContext(UserContext);

	useEffect(() => {
		let mounted = true;

		if (route) {
			const getProducts = async () => {
				try {
					const { data } = await Axios.get(route);

					const {
						data: { products },
						count,
					} = data;

					if (mounted) {
						setData({ products, count });
						setGlobalErr(undefined);
					}
				} catch (err) {
					if (mounted && err.response) {
						err = {
							message: err.response.data.message,
							isUnexpected: err.isUnexpected,
							isNotFound: err.isNotFound,
						};
						setGlobalErr(err);
						setData({ products: undefined, count: 0 });
					}
				}
			};

			getProducts();
		}

		return () => {
			mounted = false;
		};
	}, [route]);

	const renderProducts = () => {
		const { products, count } = data;

		if (!products) {
			return <FaSpinner data-testid='loading' />;
		}

		if (count) {
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
		}

		return "no products";
	};

	return (
		<>
			{title && <h4 className='Products__title'>{title}</h4>}
			{renderProducts()}
		</>
	);
}

Products.propTypes = {
	route: PropTypes.string.isRequired,
	title: PropTypes.string,
	listCard: PropTypes.bool,
};

export default Products;

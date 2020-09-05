import React, { useEffect, useState } from "react";
import Axios from "axios";
import { FaSpinner } from "react-icons/fa";
import Product from "./Product";

function Timeline({ route }) {
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
	}, []);

	const renderProducts = () => {
		if (!products) {
			return <FaSpinner data-testid='loading' />;
		}

		return (
			<ul className='Timeline__products'>
				{products.map((product) => (
					<Product
						key={product._id}
						className='Timeline__product'
						data={product}
					/>
				))}
			</ul>
		);
	};

	return <div className='Timeline'>{renderProducts()}</div>;
}

export default Timeline;


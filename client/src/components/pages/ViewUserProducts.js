import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import Products from "../layouts/Products";
import UserContext from "../../context/UserContext";
import SearchBox from "../SearchBox";

function ViewUserProducts() {
	const location = useLocation();
	const { userId } = queryString.parse(location.search);

	const {
		userData: { user },
	} = useContext(UserContext);

	const renderProducts = () => {
		if (userId) {
			return (
				<Products
					listCard
					route={`/products?user_id=${userId}&fields=title,price,views,likes,ratingsAverage,plan,description,createdAt,slug,user_id`}
				/>
			);
		}

		return (
			<Products
				listCard
				route={`/products?user_id=${user._id}&fields=title,price,views,likes,ratingsAverage,plan,description,createdAt,slug,user_id`}
			/>
		);
	};

	return (
		<div className='page'>
			<div className='container p'>
				my products
				<SearchBox />
				{renderProducts()}
			</div>
		</div>
	);
}

export default ViewUserProducts;


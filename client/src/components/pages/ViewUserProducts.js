import React, { useContext } from "react";

import Products from "../layouts/Products";
import UserContext from "../../context/UserContext";
import SearchBox from "../SearchBox";

function ViewUserProducts() {
	const {
		userData: { user },
	} = useContext(UserContext);

	console.log(user);

	const renderProducts = () =>
		user && <Products listCard route={`/products?user_id=${user._id}`} />;

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


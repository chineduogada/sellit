import React, { useContext } from "react";

import Timeline from "../layouts/Timeline";
import UserContext from "../../context/UserContext";

function ViewUserProducts() {
	const {
		userData: { user },
	} = useContext(UserContext);

	console.log(user);

	const renderProducts = () =>
		user && <Timeline route={`/products?user_id=${user._id}`} />;

	return (
		<div className='page'>
			<div className='container p'>
				my products
				{renderProducts()}
			</div>
		</div>
	);
}

export default ViewUserProducts;


import React, { useContext } from "react";
import Showcase from "../layouts/Showcase";
import Products from "../layouts/Products";
import UserContext from "../../context/UserContext";
import Error from "../Error";

function Home() {
	const { globalErr } = useContext(UserContext);

	const renderProducts = () => {
		if (globalErr) {
			return <Error err={globalErr} />;
		}

		return (
			<>
				<Products
					route='/products?plan=vip&fields=title,price,views,likes,ratingsAverage,plan,slug,user_id'
					title='VIP products'
				/>
				<Products
					route='/products?plan=pro&fields=title,price,views,likes,ratingsAverage,plan,slug,user_id'
					title='Pro products'
				/>
				<Products
					route='/products?plan=standard&fields=title,price,views,likes,ratingsAverage,plan,slug,user_id'
					title='Standard products'
				/>
			</>
		);
	};

	return (
		<main className='page Home'>
			<Showcase />

			<div className='container pt-3'>{renderProducts()}</div>
		</main>
	);
}

export default Home;


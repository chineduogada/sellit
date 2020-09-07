import React from "react";
import Showcase from "../layouts/Showcase";
import Products from "../layouts/Products";

function Home() {
	return (
		<main className='page Home'>
			<Showcase />

			<div className='container pt-3'>
				<Products
					route='/products?plan=vip&fields=title,price,views,likes,ratingsAverage,plan'
					title='VIP products'
				/>
				<Products
					route='/products?plan=pro&fields=title,price,views,likes,ratingsAverage,plan'
					title='Pro products'
				/>
				<Products
					route='/products?plan=standard&fields=title,price,views,likes,ratingsAverage,plan'
					title='Standard products'
				/>
			</div>
		</main>
	);
}

export default Home;


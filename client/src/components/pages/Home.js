import React from "react";
import Showcase from "../layouts/Showcase";
import Products from "../layouts/Products";

function Home() {
	return (
		<main className='page Home'>
			<Showcase />

			<div className='container pt-3'>
				<Products route='/products?plan=vip' title='VIP products' />
				<Products route='/products?plan=pro' title='Pro products' />
				<Products
					route='/products?plan=standard'
					title='Standard products'
				/>
			</div>
		</main>
	);
}

export default Home;


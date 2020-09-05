import React, { useEffect, useState } from "react";
import Showcase from "../layouts/Showcase";
import Axios from "axios";
import Timeline from "../layouts/Timeline";

function Home() {
	return (
		<main className='page Home'>
			<Showcase />

			<div className='container'>
				<Timeline route='/products' />
			</div>
		</main>
	);
}

export default Home;


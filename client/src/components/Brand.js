import React from "react";
import { Link } from "react-router-dom";

function Brand() {
	return (
		<Link to='/' className='brand' data-testid='sell-it.ng'>
			sellIt
			<span className='brand__ng'>.ng</span>
		</Link>
	);
}

export default Brand;


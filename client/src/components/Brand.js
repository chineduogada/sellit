import React from "react";
import { Link } from "react-router-dom";

function Brand() {
	return (
		<Link to='/' className='Brand' data-testid='sell-it.ng'>
			sellIt
			<span className='Brand__ng'>.ng</span>
		</Link>
	);
}

export default Brand;


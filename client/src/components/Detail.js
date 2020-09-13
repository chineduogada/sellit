import React from "react";

function Detail({ data, className }) {
	return (
		<div className={`Detail ${className || ""}`}>
			<h6 className='Detail__title'>{data.title}</h6>
			<p className='Detail__value'>{data.value}</p>
		</div>
	);
}

export default Detail;


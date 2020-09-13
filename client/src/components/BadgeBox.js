import React from "react";

function BadgeBox({ dark, title, badges }) {
	return (
		<ul className='badge-box flex mb-0'>
			<p className='badge-box__title capitalize mb-0'>{title}:</p>
			{badges.map((badge, index) => (
				<li key={index} className={`badge ${dark ? "badge--dark" : ""}`}>
					{badge}
				</li>
			))}
		</ul>
	);
}

export default BadgeBox;


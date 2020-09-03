import React from "react";
import PropTypes from "prop-types";

function Clickable({ className, children, ...rest }) {
	return (
		<button className={`Clickable ${className || ""}`} {...rest}>
			{children}
		</button>
	);
}

Clickable.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
};

export default Clickable;

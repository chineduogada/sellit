import React from "react";
import PropTypes from "prop-types";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

const Page = ({ className, children, ...rest }) => (
	<div className={`${className || ""} page`} {...rest}>
		<div className='container pr-1 pl-1'>{children}</div>
	</div>
);

Page.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
};

export { Home, Login, Signup, Profile };
export default Page;

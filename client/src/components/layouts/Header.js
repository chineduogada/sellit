import React from "react";
import AuthOptions from "../AuthOptions";
import Brand from "../Brand";

function Header() {
	return (
		<header className='Header p-1'>
			<div className='container flex-jc-sb flex-ai-center'>
				<Brand />

				<AuthOptions />
			</div>
		</header>
	);
}

export default Header;


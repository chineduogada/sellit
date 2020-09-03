import React from "react";
import AuthOptions from "../AuthOptions";

function Header() {
	return (
		<header className='Header p-1'>
			<div className='container flex-jc-sb flex-ai-center'>
				<div className='brand' data-testid='sell-it.ng'>
					sellIt
					<span className='brand__ng'>.ng</span>
				</div>

				<AuthOptions />
			</div>
		</header>
	);
}

export default Header;


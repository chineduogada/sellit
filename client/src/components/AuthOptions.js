import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { Button, IconButton } from "@material-ui/core";

import UserContext from "../context/UserContext";

function AuthOptions() {
	const { userData } = useContext(UserContext);
	const history = useHistory();

	const handleLogin = () => {
		history.push("/login");
	};
	const handleSignup = () => {
		history.push("/signup");
	};

	const loggedInOptions = (
		<div className='flex-ai-center'>
			<IconButton aria-label='my-ads' data-testid='my-ads'>
				<AiOutlineMenu />
			</IconButton>

			<IconButton aria-label='profile' data-testid='profile'>
				<AiOutlineUser />
			</IconButton>

			<Button variant='contained' color='primary'>
				sell it
			</Button>
		</div>
	);

	const loggedOutOptions = (
		<div className='flex-ai-center'>
			<Button onClick={handleLogin}>login</Button>

			<Button variant='contained' color='primary' onClick={handleSignup}>
				sign up
			</Button>
		</div>
	);

	if (userData.token) {
		return loggedInOptions;
	}
	return loggedOutOptions;
}

export default AuthOptions;


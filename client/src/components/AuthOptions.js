import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineUser, AiOutlineMenuUnfold } from "react-icons/ai";
import { Button, IconButton } from "@material-ui/core";

import UserContext from "../context/UserContext";
import {
	handleProductsClick,
	handleProfileClick,
	handleSellItClick,
	handleLoginClick,
	handleSignupClick,
} from "./handlers";

function AuthOptions() {
	const { userData } = useContext(UserContext);
	const history = useHistory();

	const loggedInOptions = (
		<div className='flex-ai-center'>
			<IconButton
				aria-label='my products'
				data-testid='my-products'
				onClick={() => handleProductsClick(history)}
			>
				<AiOutlineMenuUnfold />
			</IconButton>

			<IconButton
				onClick={() => handleProfileClick(history)}
				aria-label='profile'
				data-testid='profile'
			>
				<AiOutlineUser />
			</IconButton>

			<Button
				variant='contained'
				color='primary'
				onClick={() => handleSellItClick(history)}
			>
				sell it
			</Button>
		</div>
	);

	const loggedOutOptions = (
		<div className='flex-ai-center'>
			<Button onClick={() => handleLoginClick(history)}>login</Button>

			<Button
				variant='contained'
				color='primary'
				onClick={() => handleSignupClick(history)}
			>
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


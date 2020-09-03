import React, { useContext } from "react";
import {
	AiOutlineUser,
	AiOutlineMenuUnfold,
	AiOutlineLogout,
	AiOutlineSetting,
} from "react-icons/ai";
import { useHistory } from "react-router-dom";

import UserContext from "../../context/UserContext";
import Page from ".";
import { FaSpinner } from "react-icons/fa";
import getFullName from "../../utils/getFullName";
import Clickable from "../Clickable";
import { handleProductsClick } from "../handlers";
import logoutAUser from "../../utils/logoutAUser";

function Profile() {
	const {
		userData: { user },
		setUserData,
	} = useContext(UserContext);

	const history = useHistory();

	if (user) {
		return (
			<Page className='Profile'>
				<header className='Profile__header flex-dir-col flex-ai-center'>
					<div className='Profile__img-wrapper'>
						<AiOutlineUser className='Profile__img' />
					</div>

					<h3 className='Profile__name'>{getFullName(user)}</h3>
				</header>

				<ul className='Profile__options'>
					<li className='Profile__opt'>
						<Clickable
							className='Profile__control'
							onClick={() => handleProductsClick(history)}
						>
							my products
							<AiOutlineMenuUnfold className='ml-2' />
						</Clickable>
					</li>
					<li className='Profile__opt'>
						<Clickable className='Profile__control'>
							settings
							<AiOutlineSetting className='ml-2' />
						</Clickable>
					</li>
					<li className='Profile__opt'>
						<Clickable
							className='Profile__control'
							onClick={() => logoutAUser(setUserData, history)}
						>
							logout
							<AiOutlineLogout className='ml-2' />
						</Clickable>
					</li>
				</ul>
			</Page>
		);
	}

	return <FaSpinner />;
}

export default Profile;


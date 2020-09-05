import React, { useContext } from "react";
import {
	AiOutlineUser,
	AiOutlineMenuUnfold,
	AiOutlineLogout,
	AiOutlineSetting,
} from "react-icons/ai";
import { useHistory } from "react-router-dom";

import UserContext from "../../context/UserContext";
import { FaSpinner } from "react-icons/fa";
import getFullName from "../../utils/getFullName";
import Clickable from "../Clickable";
import { handleProductsClick, handleSettingsClick } from "../handlers";
import logoutAUser from "../../utils/logoutAUser";

function Profile() {
	const {
		userData: { user },
		setUserData,
	} = useContext(UserContext);

	const history = useHistory();

	if (user) {
		return (
			<main className='page Profile'>
				<div className='container pr-1 pl-1'>
					<header className='Profile__header flex-dir-col flex-ai-center'>
						<div className='Profile__img-wrapper'>
							<AiOutlineUser className='Profile__img' />
						</div>

						<h3 className='Profile__name'>{getFullName(user)}</h3>
					</header>

					<ul className='Profile__options'>
						<li className='Profile__opt'>
							<Clickable
								className='Profile__control flex-jc-center flex-ai-center'
								onClick={() => handleProductsClick(history)}
							>
								<p className='Profile__opt-text m-0'>My products</p>

								<AiOutlineMenuUnfold className='ml-2' />
							</Clickable>
						</li>
						<li className='Profile__opt'>
							<Clickable className='Profile__control flex-jc-center flex-ai-center'>
								<p
									className='Profile__opt-text m-0'
									onClick={() => handleSettingsClick(history)}
								>
									Settings
								</p>

								<AiOutlineSetting className='ml-2' />
							</Clickable>
						</li>
						<li className='Profile__opt'>
							<Clickable
								className='Profile__control flex-jc-center flex-ai-center'
								onClick={() => logoutAUser(setUserData, history)}
							>
								<p className='Profile__opt-text m-0'>Logout</p>

								<AiOutlineLogout className='ml-2' />
							</Clickable>
						</li>
					</ul>
				</div>
			</main>
		);
	}

	return <FaSpinner />;
}

export default Profile;


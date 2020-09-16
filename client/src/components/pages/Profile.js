import React, { useContext, useEffect, useState } from "react";
import {
	AiOutlineMenuUnfold,
	AiOutlineLogout,
	AiOutlineSetting,
} from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import AppContext from "../../context/AppContext";
import Clickable from "../Clickable";
import { handleProductsClick, handleSettingsClick } from "../handlers";
import logoutAUser from "../../utils/logoutAUser";
import fetchUser from "../../utils/fetchUser";
import UserProfile from "../UserProfile";

function Profile() {
	const history = useHistory();
	const location = useLocation();
	const query = queryString.parse(location.search);

	const { appData, setAppData } = useContext(AppContext);
	const [user, setUser] = useState(undefined);

	const isLoggedUser =
		!query.id || (appData.user && query.id === appData.user._id);

	useEffect(() => {
		if (!localStorage.getItem("auth-token") && !query.id) {
			history.replace("/login");
		}

		// eslint-disabled-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const getUser = async () => {
			let user = appData.user;

			if (!isLoggedUser) {
				user = await fetchUser(query.id);
			}

			setUser(user);
		};

		getUser();
	}, [appData.user, query.id]);

	const renderOptions = () => {
		if (isLoggedUser) {
			return (
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
							onClick={() => logoutAUser(setAppData, history)}
						>
							<p className='Profile__opt-text m-0'>Logout</p>

							<AiOutlineLogout className='ml-2' />
						</Clickable>
					</li>
				</ul>
			);
		}
	};

	if (user) {
		return (
			<main className='page Profile'>
				<div className='container pr-1 pl-1'>
					<UserProfile user={user} showExternalOpts={!isLoggedUser} />

					{renderOptions()}
				</div>
			</main>
		);
	}

	return <FaSpinner />;
}

export default Profile;


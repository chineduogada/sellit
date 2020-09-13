import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Axios from "axios";

import UserContext from "../context/UserContext";
import Header from "../components/layouts/Header";
import {
	Login,
	Signup,
	Home,
	Profile,
	ViewSpecificProducts,
	ViewUserProducts,
} from "../components/pages";
import fetchUser from "../utils/fetchUser";

function App() {
	const [userData, setUserData] = useState({
		user: undefined,
		token: undefined,
	});

	useEffect(() => {
		const confirmLogin = async () => {
			const { data: tokenIsValid } = await Axios.post(
				"/users/token-isvalid",
				null
			);

			if (tokenIsValid) {
				const user = await fetchUser();
				const token = localStorage.getItem("auth-token");

				setUserData({
					user,
					token,
				});
			}
		};

		confirmLogin();
	}, []);

	return (
		<div className='App flex-dir-col '>
			<UserContext.Provider value={{ userData, setUserData }}>
				<Header />

				<Switch>
					<Route path='/login' exact component={Login} />
					<Route path='/signup' exact component={Signup} />

					<Route
						path='/profile/settings'
						exact
						render={() => (
							<main className='page ProfileSetting'>
								<div className='container'>profile settings</div>
							</main>
						)}
					/>
					<Route path='/profile' exact component={Profile} />

					<Route
						path='/products/:slug'
						exact
						component={ViewSpecificProducts}
					/>
					<Route path='/products' exact component={ViewUserProducts} />

					<Route path='/' exact component={Home} />
					<Route
						path='*'
						render={() => (
							<main className='page PageNotFound'>
								<div className='container'>page not found</div>
							</main>
						)}
					/>
				</Switch>
			</UserContext.Provider>
		</div>
	);
}

export default App;


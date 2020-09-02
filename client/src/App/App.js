import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Axios from "axios";

import Header from "../components/layouts/Header";
import Login from "../components/pages/Login";
import Signup from "../components/pages/Signup";
import Home from "../components/pages/Home";
import UserContext from "../context/UserContext";

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
				const {
					data: { data },
				} = await Axios.get("/users");

				const { user } = data;
				const token = localStorage.getItem("auth-token");

				setUserData({ user, token });
			}
		};

		confirmLogin();
	}, []);

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			<Header />

			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/signup' component={Signup} />
				<Route path='/' component={Home} />
			</Switch>
		</UserContext.Provider>
	);
}

export default App;


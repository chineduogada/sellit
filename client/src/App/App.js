import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Axios from "axios";

import UserContext from "../context/UserContext";
import ProductsContext from "../context/ProductsContext";
import Header from "../components/layouts/Header";
import { Login, Signup, Home, Profile } from "../components/pages";

function App() {
	const [userData, setUserData] = useState({
		user: undefined,
		token: undefined,
	});
	const [products, setProducts] = useState(undefined);

	useEffect(() => {}, []);

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
		<div className='App flex-dir-col '>
			<UserContext.Provider value={{ userData, setUserData }}>
				<Header />

				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/signup' component={Signup} />

					<ProductsContext.Provider value={{ products, setProducts }}>
						<Route path='/profile' component={Profile} />
						<Route path='/' component={Home} />
					</ProductsContext.Provider>
				</Switch>
			</UserContext.Provider>
		</div>
	);
}

export default App;


import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Axios from "axios";

import App from "./App/App";
import "./index.scss";

// Axios configuration
let token = localStorage.getItem("auth-token");
if (token === null) {
	token = "";
	localStorage.setItem("auth-token", "");
}
Axios.defaults.headers = {
	authorization: token,
};
Axios.defaults.baseURL = "http://127.0.0.1:5000/api/v1";

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
);


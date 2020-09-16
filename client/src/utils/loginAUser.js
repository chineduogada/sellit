import Axios from "axios";

const loginAUser = async (loginData, setAppData, history) => {
	const { data } = await Axios.post("/users/login", loginData);

	const { user } = data.data;
	const token = `Bearer ${data.token}`;

	setAppData({ user, token });
	localStorage.setItem("auth-token", token);
	history.push("/");
};

export default loginAUser;


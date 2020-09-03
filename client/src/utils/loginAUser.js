import Axios from "axios";

const loginAUser = async (loginData, setUserData, history) => {
	const { data } = await Axios.post("/users/login", loginData);

	const { user } = data.data;
	const token = `Bearer ${data.token}`;

	setUserData({ user, token });
	localStorage.setItem("auth-token", token);
	history.push("/");
};

export default loginAUser;


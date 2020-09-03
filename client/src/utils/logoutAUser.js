const logoutAUser = async (setUserData, history) => {
	setUserData({ user: undefined, token: undefined });
	localStorage.setItem("auth-token", "");
	history.push("/");
};

export default logoutAUser;


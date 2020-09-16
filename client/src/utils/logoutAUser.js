const logoutAUser = async (setAppData, history) => {
	setAppData({ user: undefined, token: undefined });
	localStorage.setItem("auth-token", "");
	history.push("/");
};

export default logoutAUser;


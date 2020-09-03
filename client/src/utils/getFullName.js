const getFullName = (user) => {
	const fullName = `${user.first_name}${
		user.last_name ? " " + user.last_name : ""
	}`;

	return fullName;
};

module.exports = getFullName;


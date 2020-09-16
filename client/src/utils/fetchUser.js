import Axios from "axios";

/**
 * fetches full details of a `user` - which includes: `info`, `followers/followings` and `total posted products`.
 * @param {string} userId - the id of the user. if `omitted` the `loggedIn` user will be fetched.
 * @returns a `Promise` - the `resolved` user or `rejected` error message.
 */
const fetchUser = async (userId) => {
	try {
		let user = {};

		if (userId) {
			const {
				data: { data },
			} = await Axios.get(`/users/${userId}`);

			user = data.user;
		} else {
			const {
				data: { data },
			} = await Axios.get("/users");

			user = data.user;
		}

		let {
			data: {
				data: { followers },
			},
		} = await Axios.get(`/followers/${user._id}`);
		followers = followers.map((follower) => follower.user_id);

		let {
			data: {
				data: { followings },
			},
		} = await Axios.get(`/followers/followings/${user._id}`);
		followings = followings.map((following) => following.following.user_id);

		const {
			data: {
				data: { products },
			},
		} = await Axios.get(
			`/products?user_id=${user._id}&fields=title,,slug,user_id`
		);

		return {
			...user,
			followers,
			followings,
			totalProducts: products.length,
		};
	} catch (error) {
		return error.response && error.response.data.message;
	}
};

export default fetchUser;


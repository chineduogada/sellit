const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

/**
 * @function signToken - use `jwt.sign()`
 * @param {any} payload - payload for the `jwt.sign(<payload>)`
 */
exports.signToken = (payload) => {
	const token = jwt.sign(payload, secret);

	return token;
};

/**
 * @function signToken - use `jwt.verify()`
 * @param {string} token - payload for the `jwt.verify(<token>)`
 */
exports.verifyToken = (token) => {
	const decoded = jwt.verify(token, secret);

	return decoded;
};

/**
 * @function getToken - provide from the `headers.authorization`
 * @param {object} req - the `request` object from `express` middlewares
 */
exports.getToken = (req) => {
	const { authorization } = req.headers;

	let token;

	if (authorization && authorization.startsWith("Bearer")) {
		token = authorization.split(" ")[1];
	}

	return token;
};


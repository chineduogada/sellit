/**
 * @class
 * AppError - extends the global Error class
 */
class AppError extends Error {
	/**
	 *
	 * @param {string} message - the error message.
	 * @param {number} statusCode - the status code. if omitted, `500: internal server error` will be default.
	 */
	constructor(message, statusCode) {
		super(message);

		this.message = message;
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = AppError;


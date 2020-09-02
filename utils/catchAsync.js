/**
 *
 * @param {(req, res, next)} asyncFn - `async` function: `express-route-handler`
 */
const catchAsync = (asyncFn) => (req, res, next) => {
	asyncFn(req, res, next).catch((err) => next(err));
};

module.exports = catchAsync;


const Joi = require("joi");
const bcrypt = require("bcryptjs");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { signToken, verifyToken, getToken } = require("../utils/token");
const UserModel = require("../models/userModel");

exports.signup = catchAsync(async (req, res, next) => {
	const schema = {
		email: Joi.string().email().required(),
		password: Joi.string().min(5).required(),
		password_check: Joi.string().required(),
		first_name: Joi.string().required(),
		last_name: Joi.string().optional(),
		phone_number: Joi.string().required(),
	};

	const { error } = Joi.validate(req.body, schema);
	if (error) {
		const err = new AppError(error.details[0].message, 400);
		return next(err);
	}

	if (req.body.password !== req.body.password_check) {
		const err = new AppError("`password` must match `password_check`", 400);
		return next(err);
	}

	const userWithEmail = await UserModel.findOne({ email: req.body.email });
	if (userWithEmail) {
		const err = new AppError("a user with this email already exits!", 400);
		return next(err);
	}

	const passwordHash = await bcrypt.hash(req.body.password, 12);

	const reqBody = { ...req.body, password: passwordHash };
	Reflect.deleteProperty(reqBody, "password_check");

	const user = await UserModel.create(reqBody);
	const token = signToken({ id: user._id });

	res.status(201).json({
		status: "success",
		token,
		data: {
			user: {
				_id: user._id,
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
				phone_number: user.phone_number,
			},
		},
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const schema = {
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	};

	const { error } = Joi.validate(req.body, schema);
	if (error) {
		const err = new AppError(error.details[0].message, 400);
		return next(err);
	}

	const user = await UserModel.findOne({ email: req.body.email }).select(
		"+password"
	);

	if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
		const err = new AppError("invalid `email` or `password`", 400);
		return next(err);
	}

	const token = signToken({ id: user._id });

	res.status(201).json({
		status: "success",
		token,
		data: {
			user: {
				_id: user._id,
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
				phone_number: user.phone_number,
			},
		},
	});
});

exports.protect = catchAsync(async (req, res, next) => {
	const token = getToken(req);
	const decoded = verifyToken(token);
	const user = await UserModel.findById(decoded.id);

	if (!user) {
		const err = new AppError(
			"the user whom this token was issued to, no longer exist",
			401
		);
		return next(err);
	}

	req.user = { ...user, _id: `${user._id}` };

	next();
});

exports.tokenIsValid = async (req, res) => {
	try {
		const token = getToken(req);
		const decoded = verifyToken(token);
		const user = await UserModel.findById(decoded.id);

		if (!user) {
			return res.status(401).send(false);
		}

		res.status(200).send(true);
	} catch (err) {
		err = false;
		res.status(401).send(err);
	}
};


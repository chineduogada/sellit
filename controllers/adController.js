const Joi = require("joi");

const catchAsync = require("../utils/catchAsync");
const slugify = require("../utils/slugify");
const AppError = require("../utils/AppError");
const AdModel = require("../models/adModel");

exports.postAd = catchAsync(async (req, res, next) => {
	const schema = {
		category: Joi.string().required(),
		keywords: Joi.array().required(),
		region: Joi.string().required(),
		title: Joi.string().required(),
		type: Joi.string().required(),
		condition: Joi.string().required(),
		description: Joi.string().required(),
		price: Joi.number().required(),
		is_negotiable: Joi.boolean().optional(),
		phone_number: Joi.string().required(),
		full_name: Joi.string().required(),
		plan: Joi.string().required(),
		photos: Joi.array().required(),
	};

	const { error } = Joi.validate(req.body, schema);
	if (error) {
		const err = new AppError(error.details[0].message, 400);
		return next(err);
	}

	const reqBody = {
		...req.body,
		userId: req.user._id,
		slug: slugify(req.body.title),
	};

	const ad = await AdModel.create(reqBody);

	res.status(201).json({
		status: "success",
		data: {
			ad,
		},
	});
});


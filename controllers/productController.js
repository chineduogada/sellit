const Joi = require("joi");

const catchAsync = require("../utils/catchAsync");
const slugify = require("../utils/slugify");
const AppError = require("../utils/AppError");
const { verifyToken, getToken } = require("../utils/token");
const APIFeatures = require("../utils/APIFeatures");
const ProductModel = require("../models/productModel");
const FollowModel = require("../models/followModel");
const formatPrice = require("../client/src/utils/formatPrice").default;

exports.getAllProducts = catchAsync(async (req, res) => {
	// const token = getToken(req);
	// if (token) {
	// 	const decoded = verifyToken(token);

	// 	const followings = await FollowModel.find({
	// 		user_id: decoded.id,
	// 	});

	// }

	const apiFeature = new APIFeatures(ProductModel, req.query)
		.filter()
		.project()
		.paginate()
		.sort();

	let products = await apiFeature.query;

	res.status(200).json({
		status: "success",
		count: products.length,
		data: {
			products,
		},
	});
});

exports.getAllUserProducts = catchAsync(async (req, res) => {
	const products = await ProductModel.find({ user_id: req.params.id }).sort(
		"-createdAt"
	);

	res.status(200).json({
		status: "success",
		count: products.length,
		data: {
			products,
		},
	});
});

exports.postAProduct = catchAsync(async (req, res, next) => {
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
		user_id: req.user._id,
		ratings: [],
		ratingsAverage: "",
		slug: slugify(req.body.title),
		// price: formatPrice("en-NG", req.body.price, "NGN"),
	};

	const product = await ProductModel.create(reqBody);

	res.status(201).json({
		status: "success",
		data: {
			product,
		},
	});
});


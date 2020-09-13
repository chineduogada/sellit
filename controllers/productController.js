const Joi = require("joi");

const catchAsync = require("../utils/catchAsync");
const slugify = require("../utils/slugify");
const AppError = require("../utils/AppError");
const { verifyToken, getToken } = require("../utils/token");
const APIFeatures = require("../utils/APIFeatures");
const ProductModel = require("../models/productModel");
const FollowModel = require("../models/followModel");

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

	const products = await apiFeature.query;

	res.status(200).json({
		status: "success",
		count: products.length,
		data: {
			products,
		},
	});
});

exports.getAProduct = async (req, res, next) => {
	try {
		const { id: user_id, slug } = req.params;

		const product = await ProductModel.findOne({ user_id, slug });

		if (!product) {
			const err = new AppError("product not found", 404);
			return next(err);
		}

		res.status(200).json({
			status: "success",
			data: {
				product,
			},
		});
	} catch (err) {
		err = new AppError("product not found", 404);
		return next(err);
	}
};

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

	// if (this.plan === "vip") {
	// 	const err = new AppError(
	// 		"`description`: must be `700` or less characters",
	// 		400
	// 	);
	// 	return next(err);
	// }
	// if (this.plan === "pro") {
	// 	const err = new AppError(
	// 		"`description`: must be `400` or less characters",
	// 		400
	// 	);
	// 	return next(err);
	// }
	// if (this.plan === "standard") {
	// 	const err = new AppError(
	// 		"`description`: must be `300` or less characters",
	// 		400
	// 	);
	// 	return next(err);
	// }
	const reqBody = {
		...req.body,
		user_id: req.user._id,
		ratings: [],
		ratingsAverage: "",
		slug: slugify(req.body.title),
	};

	const existingProduct = await ProductModel.findOne({
		user_id: reqBody.user_id,
		title: reqBody.title,
	});
	if (existingProduct) {
		const err = new AppError(
			"you have an existing product with the same title! please post another product",
			400
		);
		return next(err);
	}

	const product = await ProductModel.create(reqBody);

	res.status(201).json({
		status: "success",
		data: {
			product,
		},
	});
});


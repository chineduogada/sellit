const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	user_id: String,
	slug: String,
	views: { type: Number, default: 0 },
	likes: { type: Number, default: 0 },
	is_negotiable: {
		type: Boolean,
		default: false,
	},
	ratings_average: {
		type: Number,
		default: 1.0,
		min: [1, `'ratingsAverage' must be '1' or more`],
		max: [5, `'ratingsAverage' must be '5' or less`],
	},
	category: {
		type: String,
		lowercase: true,
		enum: {
			values: ["electronics", "fashion"],
			message: "`category`: must be either `electronics` or `fashion`",
		},
		required: [true, "please provide the `category`"],
	},
	keywords: [String],
	region: {
		type: String,
		minlength: [3, "`region`: must be `3` or more characters"],
		required: [true, "please provide your `region`"],
	},
	title: {
		type: String,
		minlength: [3, "`title`: must be `3` or more characters"],
		required: [true, "please provide the `title`"],
	},
	type: {
		type: String,
		minlength: [3, "`type`: must be `3` or more characters"],
		required: [true, "please provide the `type`"],
	},
	condition: {
		type: String,
		lowercase: true,
		enum: {
			values: ["used", "new"],
			message: "`condition`: must be either `used` or`new`",
		},
		required: [true, "please provide the `condition`"],
	},
	description: {
		type: String,
		minlength: [11, "`description`: must be `11` or more characters"],
		required: [true, "please provide the `description`"],
	},
	price: {
		type: Number,
		min: [11, "`price`: must be more than `10` naira"],
		required: [true, "please provide the `price`"],
	},
	phone_number: {
		type: String,
		minlength: [11, "`phone_number: must be more than `10` characters"],
		maxlength: [14, "`phone_number: must be less than `15` characters"],
		required: [true, "please provide your `phone_number`"],
	},
	full_name: {
		type: String,
		minlength: [6, "`full_name`: must be more than `5` characters"],
		required: [true, "please provide your `full_name`"],
	},
	plan: {
		type: String,
		lowercase: true,
		enum: {
			values: ["standard", "pro", "vip"],
			message: "`plan`: must be either `standard`, `pro` or `vip`",
		},
		required: [true, "please provide your `plan`"],
	},
	photos: {
		type: [String],
		validate: {
			validator: (val) => {
				return val.length > 0;
			},
			message: "must have one `photo` at least",
		},
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;


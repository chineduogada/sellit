const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	// ratings: [{
	// 	user_id: String,
	// 	ratedAt: Date
	// }],
	// ratingsAverage: String,
	user_id: String,
	slug: String,
	views: { type: Number, default: 0 },
	is_negotiable: {
		type: Boolean,
		default: function () {
			return this.price >= 10000;
		},
	},

	category: {
		type: String,
		lowercase: true,
		enum: {
			values: ["electronics", "fashion"],
			message: "must be either: `electronics` or `fashion`",
		},
		required: [true, "please provide the `category`"],
	},
	keywords: [String],
	region: {
		type: String,
		minlength: [3, "must be more than `2` chars"],
		required: [true, "please provide your `region`"],
	},
	title: {
		type: String,
		minlength: [3, "must be more than `2` chars"],
		required: [true, "please provide the `title`"],
	},
	type: {
		type: String,
		minlength: [3, "must be more than `2` chars"],
		required: [true, "please provide the `type`"],
	},
	condition: {
		type: String,
		lowercase: true,
		enum: {
			values: ["used", "brand new"],
			message: "must be either: `used` or`brand new`",
		},
		required: [true, "please provide the `condition`"],
	},
	description: {
		type: String,
		minlength: [11, "must be more than `10` chars"],
		required: [true, "please provide the `description`"],
	},
	price: {
		type: Number,
		min: [11, "must be more than `10` naira"],
		required: [true, "please provide the `price`"],
	},
	phone_number: {
		type: String,
		minlength: [11, "must be more than `10` chars"],
		maxlength: [14, "must be less than `15` chars"],
		required: [true, "please provide your `phone_number`"],
	},
	full_name: {
		type: String,
		minlength: [6, "must be more than `5` chars"],
		required: [true, "please provide your `full_name`"],
	},
	plan: {
		type: String,
		lowercase: true,
		enum: {
			values: ["standard", "top", "premium"],
			message: "must be either: `standard`, `top` or `premium`",
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


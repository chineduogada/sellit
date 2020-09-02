const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
	userId: String,
	slug: String,
	category: {
		type: String,
		lowercase: true,
		enum: {
			values: ["health&beauty", "animals&pests", "electronics", "fashion"],
			message:
				"must be either: `health&beauty`, `animals&pests`, `electronics` or `fashion`",
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
	is_negotiable: Boolean,
	phone_number: {
		type: String,
		minlength: [11, "must be more than `11` chars"],
		required: [true, "please provide your `phone_number`"],
	},
	full_name: {
		type: String,
		minlength: [11, "must be more than `11` chars"],
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
});

const AdModel = mongoose.model("Ad", adSchema);

module.exports = AdModel;


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "please provide your `email`"],
	},
	password: {
		type: String,
		select: false,
		required: [true, "please provide a `password`"],
	},
	first_name: {
		type: String,
		required: [true, "please provide your `first-name`"],
	},
	last_name: { type: String },
	phone_number: {
		type: String,
		minlength: [11, "must be more than `11` chars"],
		required: [true, "please provide your `phone-number`"],
	},
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;


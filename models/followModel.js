const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
	following: {
		user_id: {
			type: String,
			required: [true, "please provide your `following_user_id`"],
		},
		full_name: String,
	},
	user_id: String,
});

const FollowModel = mongoose.model("Follow", followSchema);

module.exports = FollowModel;


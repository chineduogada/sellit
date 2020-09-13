const catchAsync = require("../utils/catchAsync");
const UserModel = require("../models/userModel");

exports.getAUser = catchAsync(async (req, res) => {
	const userId = (req.user && req.user._id) || req.params.id;

	const user = await UserModel.findById(userId);

	res.status(200).json({
		status: "success",
		data: {
			user,
		},
	});
});


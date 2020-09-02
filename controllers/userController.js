const catchAsync = require("../utils/catchAsync");
const UserModel = require("../models/userModel");

exports.getAUser = catchAsync(async (req, res) => {
	const user = await UserModel.findById(req.user._id);

	res.status(200).json({
		status: "success",
		data: {
			user,
		},
	});
});


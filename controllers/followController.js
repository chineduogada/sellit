const Joi = require("joi");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const FollowModel = require("../models/followModel");
const UserModel = require("../models/userModel");
const getFullName = require("../utils/getFullName");

exports.getFollowers = catchAsync(async (req, res) => {
	// get all users that are Followers (following) of the LoggedUser
	const followers = await FollowModel.find({
		["following.user_id"]: req.user._id,
	});

	res.status(201).json({
		status: "success",
		count: followers.length,
		data: {
			followers,
		},
	});
});

exports.getFollowings = catchAsync(async (req, res) => {
	// get all users that the LoggedUser is following
	const followings = await FollowModel.find({
		user_id: req.user._id,
	});

	res.status(201).json({
		status: "success",
		count: followings.length,
		data: {
			followings,
		},
	});
});

exports.follow = catchAsync(async (req, res, next) => {
	/**
	 * Checks before following her :)
	 * 1. get the user (followingUser) that the LoggedUser wants to follow to see if she exist.
	 * 2. get the user (followedUser) that the LoggedUser wants to follow to see if he already followed her.
	 * 3. check if LoggedUser wants to follow himself.
	 */

	const followingUser = await UserModel.findById(req.params.id);
	if (!followingUser) {
		const err = new AppError(
			`the user with the 'id: ${req.params.id}' who you want to follow, is not found!`,
			404
		);
		return next(err);
	}

	const followedUser = await FollowModel.findOne({
		user_id: req.user._id,
		["following.user_id"]: req.params.id,
	});
	if (followedUser) {
		const err = new AppError(
			`you have already followed this user with the 'id: ${req.params.id}'!`,
			400
		);
		return next(err);
	}

	const loggedUser = req.user;
	if (loggedUser._id === req.params.id) {
		const err = new AppError(`you can't follow yourself!`, 400);
		return next(err);
	}

	const reqBody = {
		following: {
			user_id: followingUser._id,
			full_name: getFullName(followingUser),
		},
		user_id: loggedUser._id,
	};

	const follow = await FollowModel.create(reqBody);

	res.status(201).json({
		status: "success",
		data: {
			follow,
		},
	});
});

exports.unfollow = catchAsync(async (req, res) => {
	// get and delete the user that the LoggedUser is following
	const unfollow = await FollowModel.findOneAndDelete({
		user_id: req.user._id,
		["following.user_id"]: req.params.id,
	});

	res.status(201).json({
		status: "success",
		data: {
			unfollow,
		},
	});
});


const router = require("express").Router();

const followController = require("../controllers/followController");
const authController = require("../controllers/authController");

router.get("/", authController.protect, followController.getFollowers);
router.get(
	"/followings",
	authController.protect,
	followController.getFollowings
);

router
	.route("/:id")
	.post(authController.protect, followController.follow)
	.delete(authController.protect, followController.unfollow);

module.exports = router;


const router = require("express").Router();

const followController = require("../controllers/followController");
const authController = require("../controllers/authController");

router.get("/:id", followController.getFollowers);

router.get("/followings/:id", followController.getFollowings);

router
	.route("/:id")
	.post(authController.protect, followController.follow)
	.delete(authController.protect, followController.unfollow);

module.exports = router;


const router = require("express").Router();

const adController = require("../controllers/adController");
const authController = require("../controllers/authController");

router.route("/").post(authController.protect, adController.postAd);

module.exports = router;


const router = require("express").Router();

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

router.route("/").post(authController.protect, productController.postAProduct);

module.exports = router;


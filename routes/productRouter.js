const router = require("express").Router();

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

router
	.route("/")
	.get(productController.getAllProducts)
	.post(authController.protect, productController.postAProduct);

router.get(
	"/users/:id",
	authController.protect,
	productController.getAllUserProducts
);

router.get("/:slug/users/:id", productController.getAProduct);

module.exports = router;


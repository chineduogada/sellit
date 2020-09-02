const router = require("express").Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/token-isvalid", authController.tokenIsValid);

router.get("/", authController.protect, userController.getAUser);

module.exports = router;


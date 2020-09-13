const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const globalErrorController = require("./controllers/globalErrorController");
const AppError = require("./utils/AppError");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const followRouter = require("./routes/followRouter");

// setup express app
const app = express();
app.use(express.json());
app.use(cors());

// log requests in Development ENV
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// setup routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/followers", followRouter);

// unhandled routes
app.use("*", (req, res, next) => {
	const err = new AppError(
		`no such 'route: ${req.originalUrl}' with the 'method: ${req.method}', on this server`,
		500
	);
	next(err);
});

//Global Error handler
app.use(globalErrorController);

// export the app
module.exports = app;


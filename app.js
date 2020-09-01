const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const AppError = require("./utils/AppError");
const userRouter = require("./routes/userRouter");

// setup express app
const app = express();
app.use(express.json());
// app.use(cors());

// log requests in Development ENV
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// setup routes
app.use("/api/v1/users", userRouter);

// unhandled routes
app.use("*", (req, res, next) => {
	const err = new AppError(
		`no such 'route: ${req.originalUrl}' with the 'method: ${req.method}', on this server`,
		404
	);
	next(err);
});

const sendDevErr = (err, res) => {
	res.status(err.statusCode).json({
		message: err.message,
		err,
		stack: err.stack,
	});
};

const sendProdErr = (err, res) => {
	if (!err.isOperational) {
		res.status(err.statusCode).json({
			message: err.message,
		});
	} else {
		res.status(err.status).json({
			message: "an unexpected error ocurred!",
		});
	}
};

//Global Error handler
app.use((err, req, res, next) => {
	err.status = err.status || "error";
	err.statusCode = err.statusCode || 500;

	if (process.env.NODE_ENV === "development") {
		sendDevErr(err, res);
	} else {
		sendProdErr(err, res);
	}
});

// export the app
module.exports = app;


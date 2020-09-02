// setup env variables
require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");

// listen to requests
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`the server has started at port ${port}.`));

// setup up mongoose
const dbString = process.env.DATABASE_CONNECTION_STRING_LOCAL;
mongoose
	.connect(dbString, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log("MongoDB connection established successfully."))
	.catch((err) => console.log(err, "MongoDB failed to connect."));


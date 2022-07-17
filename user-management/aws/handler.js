const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.post("/generateCipher", (req, res, next) => {
	return res.status(200).json({
		message: "Hello from root!",
	});
});

module.exports.handler = serverless(app);

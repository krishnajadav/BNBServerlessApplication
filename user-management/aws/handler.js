const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB({
	region: "ca-central-1",
});

app.use(bodyParser.json());
app.use(cors());

app.post("/generateCipher", async (req, res, next) => {
	const uid = req.body.uid;

	// get user
	const params = {
		TableName: "serverless-project-users",
		Key: {
			uid: {
				S: uid,
			},
		},
	};
	const user = await dynamodb.getItem(params).promise();

	const cipherKeyNumber = parseInt(user.Item.cipherKeyNumber.N);

	// generate 5 character alphabetic random string
	let randomString = "";
	for (let i = 0; i < 5; i++) {
		randomString += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}

	// encrypt using ceaser cipher
	let encryptedText = "";
	randomString.split("").forEach((char) => {
		const charCode = char.charCodeAt(0) - 96;
		const encryptedCharCode = (charCode + cipherKeyNumber) % 26 ? (charCode + cipherKeyNumber) % 26 : 26;
		const encryptedChar = String.fromCharCode(encryptedCharCode + 96);
		encryptedText += encryptedChar;
	});

	// save random string and encrypeted text to dynamodb append to the document
	const params2 = {
		TableName: "serverless-project-users",
		Key: {
			uid: {
				S: uid,
			},
		},
		UpdateExpression: "set encryptedText = :encryptedText, decryptedText = :decryptedText",
		ExpressionAttributeValues: {
			":encryptedText": {
				S: encryptedText,
			},
			":decryptedText": {
				S: randomString,
			},
		},
	};
	await dynamodb.updateItem(params2).promise();

	return res.status(200).json({
		cipherText: encryptedText,
	});
});

app.post("/validateCipher", async (req, res, next) => {
	const uid = req.body.uid;
	const decryptedUserText = req.body.decryptedText;
	// get user
	const params = {
		TableName: "serverless-project-users",
		Key: {
			uid: {
				S: uid,
			},
		},
	};
	const user = await dynamodb.getItem(params).promise();

	if (user.Item.decryptedText.S == decryptedUserText) {
		return res.status(200).json({
			valid: true,
		});
	} else {
		return res.status(200).json({
			valid: false,
		});
	}
});

module.exports.handler = serverless(app);

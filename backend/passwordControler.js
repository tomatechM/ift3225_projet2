const crypto = require("crypto");

exports.genPassword = (req, res, next) => {

	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	let rand_password = "";

	if (req.params.len === "" || req.params.len === "0") {return res.status(500).json({error: "Could not generate password."});}
	const l = parseInt(req.params.len, 10);
	const bytes = crypto.randomBytes(l);
	for (let i = 0; i < l; i++) {

		rand_password += chars[bytes[i] % chars.length];
	}
	console.log(rand_password);
	return res.status(200).json({password: rand_password});
	
};

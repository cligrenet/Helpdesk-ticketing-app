const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const pool = require('../config/db');

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			// Get token from header
			// console.log(req.headers.authorization);
			token = req.headers.authorization.split(' ')[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// console.log('DECODEDD', decoded);
			// Get user from token
			req.user = await pool.query(`SELECT userId, name, email FROM users WHERE userId='${decoded.id}'`);
			// console.log('REQ.USER', req.user);

			next();
		} catch (err) {
			console.log(err);
			res.status(401);
			throw new Error('Not authorized');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized');
	}
});

module.exports = { protect };

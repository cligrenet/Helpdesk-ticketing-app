const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'getTickets' });
});

// @desc Get new tickets
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
	res.status(201).json({ message: 'createTicket' });
});

module.exports = {
	getTickets,
	createTicket,
};

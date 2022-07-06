const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT
	// console.log(req.user.rows[0]);
	const wantedUserId = req.user.rows[0].user_id;
	const user = await pool.query(`SELECT * FROM users WHERE user_id=${wantedUserId}`);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const tickets = await pool.query(`SELECT * FROM tickets WHERE user_id=${wantedUserId}`);

	res.status(200).json(tickets.rows);
});

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
	// console.log(req.body);
	const { product, description } = req.body;

	if (!product || !description) {
		res.status(400);
		throw new Error('Please add a product and description');
	}

	// Get user using the id in the JWT
	const wantedUserId = req.user.rows[0].user_id;
	const user = await pool.query(`SELECT * FROM users WHERE user_id=${wantedUserId}`);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Create ticket
	const ticket = await pool.query(
		'INSERT INTO tickets(user_id, product, description, status) VALUES ($1, $2, $3, $4) RETURNING *',
		[wantedUserId, product, description, 'new'],
	);

	const newTicket = ticket.rows[0];
	// console.log(newTicket);

	res.status(201).json(newTicket);
});

// @desc Get user ticket
// @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT
	// console.log(req.user.rows[0]);
	const wantedUserId = req.user.rows[0].user_id;
	const user = await pool.query(`SELECT * FROM users WHERE user_id=${wantedUserId}`);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await pool.query(`SELECT * FROM tickets WHERE ticket_id=${req.params.id}`);
	// console.log(ticket);
	const foundTicket = ticket.rows[0];

	if (!foundTicket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	if (foundTicket.user_id !== wantedUserId) {
		res.status(401);
		throw new Error('Not authorized');
	}

	res.status(200).json(foundTicket);
});

// @desc Delete ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT
	// console.log(req.user.rows[0]);
	const wantedUserId = req.user.rows[0].user_id;
	const user = await pool.query(`SELECT * FROM users WHERE user_id=${wantedUserId}`);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await pool.query(`SELECT * FROM tickets WHERE ticket_id=${req.params.id}`);
	// console.log(ticket);
	const foundTicket = ticket.rows[0];

	if (!foundTicket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	if (foundTicket.user_id !== wantedUserId) {
		res.status(401);
		throw new Error('Not authorized');
	}

	// Remove ticket
	await pool.query(`DELETE FROM tickets WHERE ticket_id=${req.params.id}`);

	res.status(200).json({ success: true, message: 'Ticket deleted' });
});

// @desc Update ticket
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT
	// console.log(req.user.rows[0]);
	const wantedUserId = req.user.rows[0].user_id;
	const user = await pool.query(`SELECT * FROM users WHERE user_id=${wantedUserId}`);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await pool.query(`SELECT * FROM tickets WHERE ticket_id=${req.params.id}`);
	// console.log(ticket);
	const foundTicket = ticket.rows[0];

	if (!foundTicket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	if (foundTicket.user_id !== wantedUserId) {
		res.status(401);
		throw new Error('Not authorized');
	}

	// Update ticket
	const { product, description, status } = req.body;
	console.log(req.body);

	// QUESTION 1 how to set not changing columns to original value
	// QUESTION 2 how to automatically update updated_at
	const updatedTicket = await pool.query(
		`UPDATE tickets SET product=$1, description=$2, status=$3 WHERE ticket_id=$4 RETURNING *`,
		[product, description, 'new', req.params.id],
	);

	res.status(200).json(updatedTicket.rows[0]);
});

module.exports = {
	getTickets,
	createTicket,
	getTicket,
	deleteTicket,
	updateTicket,
};

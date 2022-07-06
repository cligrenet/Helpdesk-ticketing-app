const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT
	// console.log(req.user.rows[0]);
	const wantedUserId = req.user.rows[0].user_id;
	const user = await pool.query(`SELECT * FROM users WHERE user_id=${wantedUserId}`);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await pool.query(`SELECT * FROM tickets WHERE ticket_id=${req.params.ticketId}`);
	const foundTicket = ticket.rows[0];

	if (foundTicket.user_id !== wantedUserId) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const notes = await pool.query(`SELECT * FROM notes WHERE ticket_id=${req.params.ticketId}`);
	// console.log(notes);
	res.status(200).json(notes.rows);
});

// @desc Create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT
	// console.log(req.user.rows[0]);
	const wantedUserId = req.user.rows[0].user_id;
	const user = await pool.query(`SELECT * FROM users WHERE user_id=${wantedUserId}`);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await pool.query(`SELECT * FROM tickets WHERE ticket_id=${req.params.ticketId}`);
	const foundTicket = ticket.rows[0];

	if (foundTicket.user_id !== wantedUserId) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const note = await pool.query(
		'INSERT INTO notes(text, is_staff, user_id, ticket_id) VALUES ($1, $2, $3, $4) RETURNING *',
		[req.body.text, false, wantedUserId, req.params.ticketId],
	);

	// console.log(note);

	const newNote = note.rows[0];
	res.status(201).json(newNote);
});

module.exports = {
	getNotes,
	addNote,
};

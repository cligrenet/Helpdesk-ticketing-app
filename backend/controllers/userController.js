const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	// Validation
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('🔺 Please make sure all fields are completed correctly.');
	}

	// Find if user already exists
	const foundUser = await pool.query(`SELECT email FROM users WHERE email='${email}'`);
	// console.log(foundUser);
	if (foundUser.rows.length !== 0) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await pool.query(
		'INSERT INTO users(name, email, password, isAdmin) VALUES ($1, $2, $3, $4) RETURNING *',
		[name, email, hashedPassword, false],
	);
	const newUser = user.rows[0];

	if (newUser) {
		res.status(201).json({
			userId: newUser.userId,
			name: newUser.name,
			email: newUser.email,
			token: generateToken(newUser.userId),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc Login a user
// @route /api/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await pool.query(`SELECT * from users WHERE email='${email}'`);
	const foundUser = user.rows[0];

	// Check user and passords match
	if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
		res.status(200).json({
			userId: foundUser.userId,
			name: foundUser.name,
			email: foundUser.email,
			token: generateToken(foundUser.userId),
		});
	} else {
		res.status(401);
		throw new Error('Invalid credentials');
	}
});

// @desc Get current user
// @route /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
	const user = req.user.rows[0];
	res.status(200).json(user);
});

// Generate token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

module.exports = {
	registerUser,
	loginUser,
	getMe,
};

/////////////////////////////////////////
/////////////////////////////////////////
// EXAMPLE CREATE a todo //
// app.post('/todos', async(req, res) => {
// try {
// const newTodo = await pool.query('INSERT INTO todo (descrption) VALUES ($1) RETURNING *', [description]);
// res.json(newTodo.rows[0]);
// } catch (err){
//     console.error(err.message);
// }
// })

// EXAMPLE get all todos //
// app.get('/todos', async (req, res) => {
// 	try {
// 		const allTodos = await pool.query('SELECT * FROM todo');
// 		res.json(allTodos.rows);
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// });

// EXAMPLE get a todo
// app.get('/todos/:id', async (req, res) => {
// 	try {
// 		console.log(req.params);
// 		const { id } = req.params;
// 		const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
// 		res.json(todo.rows[0]);
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// });

// EXAMPLE update a todo
// app.put('/todos/:id', async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const { description } = req.body;
// 		const updateToo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);
// 		res.json('Todo was updated!');
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// });

// EXAMPLE delete a todo
// app.delete('/todos/:id', async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
// 		res.json('Todo was deleted!');
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// });

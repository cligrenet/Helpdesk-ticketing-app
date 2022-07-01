const asyncHandler = require('express-async-handler');
const pool = require('../db');

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

	res.send('Register Route');
});

// @desc Login a user
// @route /api/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	res.send('Login Route');
});

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

module.exports = {
	registerUser,
	loginUser,
};

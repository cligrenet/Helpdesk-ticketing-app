const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const pool = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.SERVER_PORT || 8080;

const app = express();

// Middlewares
const corsOptions = { origin: process.env.FRONTEND_URL, credentials: true };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Welcome to the Help Desk!' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`.yellow.bold);
});

const Pool = require('pg').Pool;
const dotenv = require('dotenv');

const PWD = process.env.DB_PASSWORD;
const USERNAME = process.env.DB_USERNAME;
const HOST = process.env.DB_HOST;
const DATABASE = process.env.DATABASE;
const DBPORT = process.env.DB_PORT;

const pool = new Pool({
	user: USERNAME,
	host: HOST,
	database: DATABASE,
	password: PWD,
	port: DBPORT,
});

module.exports = pool;

// MONGODB EXAMPLE
// const mongoose = require('mongoose');
// const connectDB = async () => {
// 	try {
// 		const conn = await mongoose.connect(process.env.MONGO_URI);
// 		console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
// 	} catch (err) {
// 		console.log(`Error: ${err.message}`.red.underline.bold);
// 		process.exit(1);
// 	}
// };

// module.exports = connectDB;

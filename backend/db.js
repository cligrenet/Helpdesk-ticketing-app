const Pool = require('pg').Pool;
const dotenv = require('dotenv');

const PWD = process.env.DB_PASSWORD;
const USERNAME = process.env.DB_USERNAME;

const pool = new Pool({
	user: USERNAME,
	host: 'localhost',
	database: 'pernhelpdesk',
	password: PWD,
	port: 5432,
});

module.exports = pool;

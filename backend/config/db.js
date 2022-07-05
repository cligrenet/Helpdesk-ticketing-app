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

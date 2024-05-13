require('dotenv').config({ path: './config/config.env' });
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  authentication: { type: 'default' },
  options: { encrypt: true },
}

console.log("Starting...");

async function connect() {
  try {
    const db_connection = await sql.connect(config);

    console.log(`Server has started on port ${process.env.DB_PORT}`);

    return db_connection;
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = connect;

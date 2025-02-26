const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // Example: 'localhost' or '127.0.0.1'
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Set to true if using Azure SQL
    enableArithAbort: true,
  },
};

const pool = new sql.ConnectionPool(dbConfig);
const db = pool
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL Database");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

module.exports = db;

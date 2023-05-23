const sql = require('mssql');
require('dotenv').config();

const databaseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  },
};

const connectDatabase = async () => {
  try {
    await sql.connect(databaseConfig);
  } catch (err) {
    throw err;
  }
};

connectDatabase();

module.exports = sql;
const sql = require('mssql/msnodesqlv8');

const databaseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  driver: "msnodesqlv8",
  server: process.env.DB_SERVER,
  options: {
    trustedConnection: true,
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
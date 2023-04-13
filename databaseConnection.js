const sql = require('mssql/msnodesqlv8');

const databaseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  driver: "msnodesqlv8",
  server: "DESKTOP-0H1FS4U\\LOCALHOST",
  options: {
    trustedConnection: true,
  },
};

const connectDatabase = async () => {
  try {
    await sql.connect(databaseConfig);
    console.log("Successfully connected to database");
  } catch (err) {
    console.log("Error connecting to database: ", err);
    throw err;
  }
};

connectDatabase();

module.exports = sql;


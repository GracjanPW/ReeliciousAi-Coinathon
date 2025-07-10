import sql from "mssql";

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER!,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Use encryption for the connection
    trustServerCertificate: true, // Change to false in production
  },
};

let pool : sql.ConnectionPool | null = null;

export const getConnection = async () => {
  if (!pool) {
    try {
      pool = await sql.connect(config);
    } catch (err) {
      console.error('Database connection failed', err);
      throw err;
    }
  }
  return pool;
};
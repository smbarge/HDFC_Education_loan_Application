// src/lib/db.js
import pkg from "pg";
const { Pool } = pkg;

// Initialize PostgreSQL client pool with a connection string (DB URL)
const pool = new Pool({
  connectionString: process.env.DB_URL,
});
// Export the pool instance
export default pool;

console.log("DB_URL is: ", process.env.DB_URL);

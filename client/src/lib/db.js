// src/lib/db.js
import { env } from '$env/dynamic/private';
import pkg from 'pg';
const { Pool } = pkg;

console.log('DB_URL is:', env.DB_URL); 

const pool = new Pool({
    connectionString: env.DB_URL,
});

export default pool;
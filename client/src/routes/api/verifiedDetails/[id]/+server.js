import { json } from "@sveltejs/kit";
import pkg from "pg";
const { Pool } = pkg;

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString:
    process.env.DB_URL ||
    "postgresql://hdfc_user:Admin%402024@3.110.235.117:5432/prodcopy_hdfc_education_loan",
});

function getISTTime() {
  const now = new Date();
  const istOffset = 5 * 60 + 30; // IST is UTC+5:30 in minutes
  const istTime = new Date(now.getTime() + istOffset * 60 * 1000); // Convert to IST
  return istTime;
}

export async function GET({ params }) {
  const client = await pool.connect(); // Get a client for the transaction

  try {
    // Extract ID from params
    const { id } = params;

    // Validate request data
    if (!id) {
      return json(
        { error: -1, errorMsg: "id is required." },
        { status: 400 }
      );
    }

    const createdAt = getISTTime();
    // Query the contact record from the database
    const result = await client.query(
      `SELECT * FROM contacts WHERE id = $1`, // Lock the row for update
      [id]
    );

    if (result.rows.length === 0) {
      return json({ error: 1, errorMsg: "Contact not found." }, { status: 404 });
    }

    const verified = result.rows[0];
    
    return json({ error: 0, errorMsg: "", verified });
  } catch (error) {
    console.error(error);
    return json({ error: -1, errorMsg: "Server error." }, { status: 500 });
  } finally {
    client.release(); // Release the client back to the pool
  }
}

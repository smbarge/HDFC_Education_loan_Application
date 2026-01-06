import pool from "$lib/db"; // Adjust the path according to your structure
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  const client = await pool.connect();
  try {
    // Parse the incoming request body to get the fd object
    const { fd, application_id } = await request.json();
    const {
      bank_name,
      branch_name,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      fd_acc_no,
      start_date,
      maturity_date,
      amount,
      owner_type,
      interest_rate,
    } = fd;

    // Input validation
    if (
      !application_id ||
      !bank_name ||
      !branch_name ||
      !street_address ||
      !dist_id ||
      !taluka_id ||
      !place ||
      !pincode ||
      !fd_acc_no ||
      !start_date ||
      !maturity_date ||
      !amount ||
      !interest_rate
    ) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    // Execute the query with provided values
    const query = `INSERT INTO fds (
      application_id,
      bank_name,
      branch_name,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      fd_acc_no,
      start_date,
      maturity_date,
      amount,
      owner_type,
      interest_rate
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id`;

    const values = [
      application_id,
      bank_name,
      branch_name,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      fd_acc_no,
      start_date,
      maturity_date,
      amount,
      owner_type || 1, // Default value for owner_type if not provided
      interest_rate,
    ];

    const result = await client.query(query, values);

    // Return only the id of the inserted row as a response
    const id = result.rows[0].id; // Extract the id
    return json({ error: 0, errorMsg: "", id }, { status: 201 });
  } catch (error) {
    console.error("Error inserting into fds:", error);
    return json({ error: "Database error" }, { status: 500 });
  } finally {
    client.release();
  }
}

import pool from "$lib/db"; // Adjust the path according to your structure
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  const client = await pool.connect();
  try {
    // Parse the incoming request body to get the licPolicy object
    const { licPolicy, application_id } = await request.json();
    const {
      policy_name,
      policy_type,
      policy_receipt_no,
      surrender_value,
      start_date,
      maturity_date,
    } = licPolicy;

    // Input validation
    if (
      !application_id ||
      !policy_name ||
      !policy_type ||
      !policy_receipt_no ||
      surrender_value === undefined || // Check for undefined specifically
      !start_date ||
      !maturity_date
    ) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    // Execute the query with provided values
    const query = `
      INSERT INTO lic_policies (
        application_id,
        policy_name,
        policy_type,
        policy_receipt_no,
        surrender_value,
        start_date,
        maturity_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;

    const values = [
      application_id,
      policy_name,
      policy_type,
      policy_receipt_no,
      surrender_value,
      start_date,
      maturity_date,
    ];

    const result = await client.query(query, values);

    // Return only the id of the inserted row as a response
    const id = result.rows[0].id; // Extract the id
    return json({ error: 0, errorMsg: "", id }, { status: 201 });
  } catch (error) {
    console.error("Error inserting into lic_policies:", error);
    return json({ error: "Database error" }, { status: 500 });
  } finally {
    client.release();
  }
}

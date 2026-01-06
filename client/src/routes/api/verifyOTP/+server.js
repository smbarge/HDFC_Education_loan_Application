import { json } from "@sveltejs/kit";
import pkg from "pg";
import pool from "$lib/db"; // Adjust the path according to your structure

// // Create a PostgreSQL pool
// const pool = new Pool({
//   connectionString:
//     process.env.DB_URL ||
//     "postgres://hdfc_user:Admin%402024@65.1.113.133/hdfc_loan_new",
// });

export async function POST({ request }) {
  const client = await pool.connect(); // Get a client for the transaction

  try {
    // Start a transaction
    await client.query("BEGIN");

    // Parse the request body
    const { uid, otp: otp_code ,dataName} = await request.json();
    console.log("Uid is ", uid, "Otp is ", otp_code);


    // Validate request data
    if (!uid || !otp_code) {
      await client.query("ROLLBACK"); // Rollback transaction
      return json(
        { error: -1, errorMsg: "uid and OTP code are required." },
        { status: 400 }
      );
    }

    // Query the OTP record from the database
    const result = await client.query(
      "SELECT * FROM otp WHERE uid = $1 AND otp_code = $2 FOR UPDATE", // Lock the row for update
      [uid, otp_code]
    );

    // If OTP not found
    if (result.rows.length === 0) {
      await client.query("ROLLBACK"); // Rollback transaction
      return json({ error: -1, errorMsg: "Invalid OTP." }, { status: 400 });
    }

    const otpRecord = result.rows[0];

    // Check if the OTP is expired
    if (new Date(otpRecord.expires_at) < new Date()) {
      await client.query("ROLLBACK"); // Rollback transaction
      return json({ error: -2, errorMsg: "OTP expired." }, { status: 400 });
    }

    // Check if OTP has already been verified
    if (otpRecord.verified) {
      await client.query("ROLLBACK"); // Rollback transaction
      return json(
        { error: -3, errorMsg: "OTP already verified." },
        { status: 400 }
      );
    }

    // Mark OTP as verified and update the verified_at timestamp
    await client.query(
      "UPDATE otp SET verified = TRUE, verified_at = now() WHERE id = $1 and uid=$2",
      [otpRecord.id,otpRecord.uid]
    );
if (dataName){
    await client.query(
      `INSERT INTO contacts (id, mobile_no_${dataName})
       VALUES ($1, $2)
       ON CONFLICT (id)
       DO UPDATE SET mobile_no_${dataName} = EXCLUDED.mobile_no_${dataName}`,
      [otpRecord.id, otpRecord.mobile]
    );
  }

    // Commit the transaction
    await client.query("COMMIT");

    // Return success response
    return json({ error: 0, errorMsg: "" });
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback the transaction on error
    console.error(error);
    return json({ error: -1, errorMsg: "Server error." }, { status: 500 });
  } finally {
    client.release(); // Release the client back to the pool
  }
}

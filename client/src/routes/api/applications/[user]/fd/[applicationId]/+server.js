import pool from "$lib/db"; // Adjust the path according to your structure
import { json } from "@sveltejs/kit";

export async function GET({ params }) {
  const client = await pool.connect();
  try {
    const { applicationId, user } = params;

    const query = `SELECT 
                    id, 
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
	                FROM fds
                  WHERE application_id = $1`;

    const values = [applicationId];
    const result = await client.query(query, values);
    const fds = result.rows;
    // Return success response
    return json({ error: 0, errorMsg: "", fds }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return json({ error: "Database error" }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function PUT({ request, params }) {
  const client = await pool.connect();
  try {
    const { applicationId } = params;
    const { fd, user, userId } = await request.json();

    if (!applicationId) {
      console.log("missing applicationId");
      return json(
        { error: "Missing applicationId required fields" },
        { status: 400 }
      );
    }
    if (!fd) {
      console.log("missing fd");
      return json({ error: "Missing fd in required fields" }, { status: 400 });
    }
    if (!user) {
      console.log("missing user");
      return json(
        { error: "Missing user in required fields" },
        { status: 400 }
      );
    }
    // if (!userId) {
    //   console.log("missing userId");
    //   return json(
    //     { error: "Missing userId in required fields" },
    //     { status: 400 }
    //   );
    // }

    const {
      id,
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
      interest_rate,
    } = fd;

    if (
      !id ||
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
      console.log("missing some fields in fd: ", fd);
      return json({ error: "Missing required fields in fd" }, { status: 400 });
    }

    const query = `UPDATE fds 
        SET 
          bank_name = $1,
          branch_name = $2,
          street_address = $3,
          dist_id = $4,
          taluka_id = $5,
          place = $6,
          pincode = $7,
          fd_acc_no = $8,
          start_date = $9,
          maturity_date = $10,
          amount = $11,
          owner_type = $12,
          interest_rate = $13
        WHERE application_id = $14 AND id = $15
        RETURNING id;
    `;

    const values = [
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
      applicationId,
      id,
    ];

    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return json({ error: "No record found to update" }, { status: 404 });
    }

    const newPropertyId = result.rows[0].id;

    // Return success response
    return json({ error: 0, errorMsg: "", id: newPropertyId }, { status: 200 });
  } catch (error) {
    console.error("Error updating data:", error);
    return json({ error: "Database error" }, { status: 500 });
  } finally {
    client.release();
  }
}

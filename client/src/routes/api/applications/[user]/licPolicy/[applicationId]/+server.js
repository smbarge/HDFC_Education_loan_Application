import pool from "$lib/db"; // Adjust the path according to your structure
import { json } from "@sveltejs/kit";

export async function GET({ params }) {
  const client = await pool.connect();
  try {
    const { applicationId, user } = params;

    const query = `SELECT 
                    id, 
                    application_id, 
                    policy_name,
                    policy_type,
                    policy_receipt_no,
                    surrender_value,
                    start_date,
                    maturity_date
	                FROM lic_policies
                  WHERE application_id = $1`;

    const values = [applicationId];
    const result = await client.query(query, values);
    const licPolicies = result.rows;
    // Return success response
    return json({ error: 0, errorMsg: "", licPolicies }, { status: 200 });
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
    const { licPolicy, user, userId } = await request.json();

    if (!applicationId) {
      console.log("missing applicationId");
      return json(
        { error: "Missing applicationId required fields" },
        { status: 400 }
      );
    }
    if (!licPolicy) {
      console.log("missing licPolicy");
      return json(
        { error: "Missing licPolicy in required fields" },
        { status: 400 }
      );
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
      policy_name,
      policy_type,
      policy_receipt_no,
      surrender_value,
      start_date,
      maturity_date,
    } = licPolicy;

    if (
      !id ||
      !application_id ||
      !policy_name ||
      !policy_type ||
      !policy_receipt_no ||
      !surrender_value ||
      !start_date ||
      !maturity_date
    ) {
      console.log("missing some fields in licPolicy: ", licPolicy);
      return json(
        { error: "Missing required fields in licPolicy" },
        { status: 400 }
      );
    }

    const query = `UPDATE lic_policies 
        SET 
        policy_name = $1,
          policy_type = $2,
          policy_receipt_no = $3,
          surrender_value = $4,
          start_date = $5,
          maturity_date = $6
        WHERE application_id = $7 AND id = $8
        RETURNING id;
    `;

    const values = [
      policy_name,
      policy_type,
      policy_receipt_no,
      surrender_value,
      start_date,
      maturity_date,
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

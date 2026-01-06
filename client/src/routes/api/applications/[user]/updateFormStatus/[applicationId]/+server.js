import pool from "$lib/db"; // Adjust this path according to your project structure
import { json } from "@sveltejs/kit";

const getDistrictCode = async (applicationId, client) => {
  const query = `SELECT 
                  pd.district_id, 
                  md.short_name 
                FROM personal_details as pd, m_district as md
                WHERE 
                  pd.district_id = md.dist_id AND
                  id = $1`;

  const result = await client.query(query, [applicationId]);
  console.log("result.rows", result.rows);

  if (result.rows.length == 0) {
    return { error: -1, errorMsg: "could not find district code" };
  }
  return { error: 0, errorMsg: "", districtCode: result.rows[0].short_name };
};

export async function POST({ request, params }) {
  const client = await pool.connect();
  try {
    const { applicationId } = params;
    const { error, errorMsg, districtCode } = await getDistrictCode(
      applicationId,
      client
    );
    if (error) {
      return json(
        { error: 0, errorMsg: "failed to get district code" },
        { status: 500 }
      );
    }

    const {
      user,
      userId,
      application_status,
      verification_status,
      iteration,
      office_id,
      final_confirmation
    } = await request.json();

    // Check if user and application_status are provided
    if (!applicationId || !user || application_status === undefined || !final_confirmation) {
      return json(
        { error: 0, errorMsg: "Missing required fields" },
        { status: 400 }
      );
    }

    let formNo;
    let formNo1;
    let query = "";
    let values = [];

    if (iteration == 1) {
      formNo = await generateFormNumber(districtCode, 2024, pool);
      formNo1 = formNo;

      // Update personal_details with form number for first iteration
      query = `
        UPDATE personal_details
        SET 
        application_status = $1,
        verification_status = $2,
        form_no = $3,
        final_confirmation =$4
        WHERE id = $5
        RETURNING *;
      `;
      values = [
        application_status,
        verification_status,
        formNo1,
        final_confirmation,
        applicationId,
      ];
    } else {
      // Update personal_details without form number for subsequent iterations
      query = `
        UPDATE personal_details
        SET 
        application_status = $1,
        verification_status = $2,
        final_confirmation= $3
        WHERE id = $4
        RETURNING *;
      `;
      values = [application_status, verification_status,final_confirmation, applicationId];
    }

    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return json(
        { error: 0, errorMsg: "Application not found" },
        { status: 400 }
      );
    }

    const query1 = `
      INSERT INTO public.verification (
        id, application_id, verification_type, level, user_id, status, created_at, updated_at, office_id, recommendation, remark, iteration
      ) 
      VALUES (
        (SELECT COALESCE(MAX(id), 0) + 1 FROM verification WHERE application_id = $1), -- id
        $1,   -- application_id
        1,    -- verification_type
        0,    -- level
        $2,   -- user_id
        0,    -- status
        CURRENT_TIMESTAMP, -- created_at
        CURRENT_TIMESTAMP, -- updated_at
        $3,   -- office_id
        0,    -- recommendation
        '',   -- remark
        $4    -- iteration
      );
    `;
    const values1 = [applicationId, userId, office_id, iteration];
    await client.query(query1, values1);

    return json({ error: 0, errorMsg: "", formNo }, { status: 200 });
  } catch (error) {
    console.error("Error updating application status:", error);
    return json(
      { error: 0, errorMsg: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

// formNumberGenerator.js
async function generateFormNumber(districtCode, year, pool) {
  const prefix = "M"; // Fixed prefix
  const district = districtCode; // District code, e.g., "BU"

  // Fetch the current form number for the district from the database
  const client = await pool.connect();
  try {
    const query = `
      SELECT form_number FROM form_counters WHERE district_code = $1 FOR UPDATE;
    `;
    const result = await client.query(query, [district]);

    let currentFormNumber;

    if (result.rowCount > 0) {
      // If the district exists, get the current form number
      currentFormNumber = result.rows[0].form_number;
    } else {
      // If the district doesn't exist, initialize it with 0
      currentFormNumber = 0;
      await client.query(
        `
        INSERT INTO form_counters (district_code, form_number) VALUES ($1, $2)
      `,
        [district, currentFormNumber]
      );
    }

    // Increment the form number
    currentFormNumber += 1;

    // Update the form number in the database
    await client.query(
      `
      UPDATE form_counters SET form_number = $1 WHERE district_code = $2
    `,
      [currentFormNumber, district]
    );

    // Format the form number
    const formattedFormNumber = `${prefix}-${district}-T-${year}-${String(
      currentFormNumber
    ).padStart(4, "0")}`;
    return formattedFormNumber;
  } catch (error) {
    console.error("Error generating form number:", error);
    throw error; // Rethrow the error to handle it later
  } finally {
    client.release();
  }
}

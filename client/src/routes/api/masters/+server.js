import { json } from "@sveltejs/kit";

import pool from "$lib/db"; // Adjust the path according to your structure

// Create a PostgreSQL pool
// const pool = new Pool({
//   connectionString:
//     process.env.DB_URL ||
//     "postgres://hdfc_user:Admin%402024@65.1.113.133/hdfc_loan_new",
// });

export async function GET() {
  let client;
  try {
    // Connect to the database
    client = await pool.connect();

    // Run the query
    let result = await client.query(
      "SELECT id, eng_name, dev_name FROM m_religion;"
    );
    const m_religion = result.rows;

    result = await client.query(
      "SELECT id, eng_name, dev_name FROM public.m_gender"
    );

    const m_gender = result.rows;

    result = await client.query(
      "SELECT id, eng_name, dev_name FROM public.m_guardian;"
    );
    const m_guardian = result.rows;

    result = await client.query(
      "SELECT state_id, country_id, dist_id, eng_name, dev_name, status, created, modify, division, seq_no  FROM public.m_district ORDER BY eng_name"
    );
    const m_district = result.rows;

    result = await client.query(
      "SELECT country_id, state_id, dist_id, taluka_id, eng_name, dev_name, status, created, modify FROM public.m_taluka ORDER BY dist_id, eng_name"
    );
    const m_taluka = result.rows;

    result = await client.query(
      "SELECT id, eng_name, dev_name FROM public.m_marital_status;"
    );
    const m_marital_status = result.rows;

    result = await client.query(
      "SELECT id, eng_name, dev_name FROM public.m_educational_qualification;"
    );
    const m_educational_qualification = result.rows;

    result = await client.query(
      "SELECT id, eng_name, dev_name FROM m_occupation"
    );
    const m_occupation = result.rows;
    result = await client.query(
      "SELECT id, eng_name, dev_name FROM m_organization_type;"
    );
    const m_organization_type = result.rows;

    result = await client.query(
      "SELECT id, eng_name, dev_name, file_type, upload_for FROM m_upload_documents order by upload_for, id"
    );
    const m_upload_documents = result.rows;

    result = await client.query(
      "SELECT id, eng_name, dev_name from m_property_type"
    );
    const m_property_type = result.rows;
    result = await client.query(
      "SELECT id, eng_name, dev_name from m_fd_lic_type"
    );
    const m_fd_lic_type = result.rows;

    result = await client.query(
      "SELECT effective_date, date FROM public.m_configration;"
    );
    const m_configration = result.rows;
    result = await client.query(
      "SELECT id, eng_name, dev_name from m_past_surety_commitment"
    );

    const m_past_surety_commitment = result.rows;
    // Release the connection back to the pool
    // Return the result as JSON
    return json({
      error: 0,
      errorMsg: "",
      masters: {
        m_religion,
        m_gender,
        m_guardian,
        m_district,
        m_taluka,
        m_marital_status,
        m_educational_qualification,
        m_occupation,
        m_organization_type,
        m_upload_documents,
        m_property_type,
        m_fd_lic_type,
        m_configration,
        m_past_surety_commitment,
      },
    });
  } catch (err) {
    console.error("Error executing query", err);
    return json({ error: "Database query failed" }, { status: 500 });
  } finally {
    await client.release();
  }
}

import { json } from "@sveltejs/kit";

import pool from "$lib/db"; // Adjust the path according to your structure

let tableName = "personal_details";

export async function GET({ request, url }) {
  const client = await pool.connect();
  try {
    let application_id = url.searchParams.get("application_id");

    let selectQuery = `SELECT * 
FROM reupload_data
WHERE application_id = $1
  AND iteration = (
    SELECT MAX(iteration)
    FROM reupload_data
    WHERE application_id = $1
  );`;
    let value = [application_id];
    let result = await client.query(selectQuery, value);

    console.log("applicationId ", application_id);
    return json({ error: 0, errorMsg: "", details: result.rows });
  } catch (error) {
    console.log("error fetching data", error);
    return json({ error: "Database error", errorMsg: error }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function POST({ request, params }) {
  const client = await pool.connect();
  try {
    console.log("post request called to add property ##1");
    const { application_id, iteration, tableName, data } = await request.json();

    console.log("applicationId", application_id);
    console.log("iteration", iteration), console.log("tableName", tableName);
    console.log("data", data);

    let keys = Object.keys(data);
    console.log("keys is", keys);
    let values = Object.values(data);
    console.log("values is", values);

    for (let i = 0; i < keys.length; i++) {
      // let insertQuery = `INSERT INTO reupload_data (application_id,iteration,table_name,field_name,value) values($1,$2,$3,$4,$5)`;
      let insertQuery = `INSERT INTO reupload_data (application_id, iteration, table_name, field_name, value)
VALUES ($1, $2, $3, $4, $5)
ON CONFLICT (application_id, iteration, table_name, field_name)
DO UPDATE SET 
    value = $5`;
      let value = [application_id, iteration, tableName, keys[i], values[i]];

      let result = await client.query(insertQuery, value);
    }

    return json(
      { error: 0, errorMsg: "", application_id, iteration, tableName, data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    return json({ error: "Database error", errorMsg: error }, { status: 500 });
  } finally {
    client.release();
  }
}

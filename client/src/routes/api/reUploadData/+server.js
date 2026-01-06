import { json } from "@sveltejs/kit";

import pool from "$lib/db"; // Adjust the path according to your structure
import { table } from "console";

export async function POST({ request, params }) {
  const client = await pool.connect();
  try {
    console.log("post request called to add property ##1");
    const { application_id, iteration, tableName, data } = await request.json();

    console.log("applicationId", application_id);
    console.log("iteration", iteration), console.log("tableName", tableName);
    console.log("data", data);

    let  keys = Object.keys(data)
   console.log('keys is',keys) 

    return json({ error: 0, errorMsg: "", application_id, iteration, tableName, data }, { status: 201 });
  } catch (error) {
    console.error("Error inserting data:", error);
    return json({ error: "Database error" }, { status: 500 });
  } finally {
    client.release();
  }
}

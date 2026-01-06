import pool from "$lib/db"; // Adjust the path according to your structure
import { json } from "@sveltejs/kit";

export async function DELETE({ params }) {
  const client = await pool.connect();
  try {
    const { id } = params;
    if (!id) {
      return json({ error: "Missing id parameter" }, { status: 400 });
    }
    const query = `DELETE FROM lic_policies WHERE  id = $1 `;
    const values = [id];

    const result = await client.query(query, values);
    if (result.rowCount === 0) {
      return json({ error: "lic policies not found" }, { status: 404 });
    }
    return json({ error: 0, errorMsg: "" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting lic policies given id:", error);
    return json({ error: "Database error" }, { status: 500 });
  } finally {
    client.release();
  }
}

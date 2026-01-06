import pool from "$lib/db";
import { promises as fs } from "fs";
import path from "path";
import { json } from "@sveltejs/kit";

export const GET = async ({ params }) => {
  const { applicationId } = params;


  try {
    const query = `
      SELECT DISTINCT ON (application_id, document_id)
        ud.application_id AS application_id,
        ud.document_id AS document_id,
        ud.status AS status,
        ud.iteration AS iteration,
        md.dev_name AS dev_name,
        md.eng_name AS eng_name,
        ud.file_name AS file_name,
        ud.org_filename AS org_filename
      FROM
        public.upload_docs ud
      INNER JOIN
        m_upload_documents md ON ud.document_id = md.id
      WHERE
        ud.application_id = $1 AND
        ud.status = 1
      ORDER BY
        application_id, document_id, iteration DESC, seq_no DESC;
    `;
    const values = [applicationId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return new Response("File not found or no active uploads", {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        error: 0,
        errorMsg: "",
        documents: result.rows,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching file: ", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};

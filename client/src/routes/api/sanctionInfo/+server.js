import { json } from "stream/consumers";
import pool from "$lib/db";
export async function GET({ url }) {
  try {
    const application_id = url.searchParams.get("application_id");

    const client = await pool.connect();
    try {
      // const selectQuery = `
      //   SELECT application_id, office_id, checkpoint_id, question_id, user_id, answer, created_at,level
      //   FROM verification_answers
      //   WHERE application_id = $1
      // `;
      let selectQuery = ` 
   select * from sanction_form where application_id = $1 and level = 1
    `;
      console.log("selectQuery: ", selectQuery);
      console.log("application_id: ", application_id);
      const answersResult = await client.query(selectQuery, [application_id]);

      let query = `select * from sanction_form where application_id = $1 and level=4`;
      let result = await client.query(query, [application_id]);
      let sanctionDetails = [];
      if (result.rows.length) {
        sanctionDetails = result.rows[0];
      }
      const response = {
        error: 0,
        errorMsg: "",
        districtDetails: answersResult.rows[0],
        sanctionDetails,
      };
      console.log("sanction details issssss", sanctionDetails);
      

      return new Response(JSON.stringify({ response }));
    } catch (error) {
      console.error("Error executing query:", error);
      return new Response(
        JSON.stringify(
          { error: -2, errorMsg: "Failed to retrieve Data" },
          { status: 500 }
        )
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error processing GET request:", error);

    return new Response(
      JSON.stringify(
        { error: -3, errorMsg: "Failed to retrieve Data" },
        { status: 500 }
      )
    );
  }
}

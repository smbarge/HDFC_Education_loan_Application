import pool from "$lib/db";

export async function GET({ request, params }) {
  let { application_id, status } = params;
  if(status == 'null') {
    status = 0
  }
  console.log("appliction is sss",params)
  const client = await pool.connect();
  try {
    const maxIterationQuery = `
      SELECT MAX(iteration) AS iteration 
      FROM verification
      WHERE application_id = $1 AND status = $2
    `;
    const maxIterationResult = await client.query(maxIterationQuery, [
      application_id,
      status,
    ]);
    const iteration = maxIterationResult.rows[0]?.iteration || 0;
    if (status == "23") {
      status = "21";
    }

    const answersQuery = `
      SELECT 
        va.application_id, 
        va.office_id, 
        va.checkpoint_id, 
        question_id, 
        va.user_id, 
        va.answer, 
        va.created_at, 
        va.updated_at, 
        va.level, 
        va.verification_id,
        q.question,
        q.document_id,
        q.instruction_eng,
        q.instruction_dev,
        q.mandatory_field
      FROM
        verification v
        JOIN verification_answers va ON v.id = va.verification_id
        JOIN m_checkpoint_questions q ON q.id = va.question_id
      WHERE 
        v.application_id = $1 AND
        va.application_id=v.application_id and
        v.iteration = $2 AND
        v.status = $3 AND
        va.answer = '2' AND
          va.question_id NOT IN (97, 98, 99, 104, 107)
      ORDER BY 
        va.checkpoint_id, 
        va.question_id
    `;
    const answersResult = await client.query(answersQuery, [
      application_id,
      iteration,
      status,
    ]);
    const answers = answersResult.rows;

    console.log("answers:", answers, "iteration:", iteration);

    return new Response(
      JSON.stringify({
        error: 0,
        errorMsg: "",
        iteration,
        application_id,
        status,
        answers,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `Error in applicationStatus/${application_id} GET endpoint:`,
      error
    );
    return new Response(
      JSON.stringify({ error: -1, errorMsg: "An error occurred" }),
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

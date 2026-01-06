import pool from "$lib/db"; // Adjust the path according to your structure
export async function POST({ request, params }) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // Parse the incoming request body to get the personalDetails object
    const { user } = params;
    // Extract properties from personalDetails
    const { personalDetails } = await request.json();
    let {
      religion,
      aadhar,
      name,
      dob,
      gender,
      address,
      mobile,
      email,
      pan,
      current_address,
      current_district,
      current_taluka,
      current_place,
      current_area,
      current_pincode,
      permanent_address,
      permanent_district,
      permanent_taluka,
      permanent_place,
      permanent_area,
      permanent_pincode,
      marital_status,
      education_qualification,
      details,
      guardian,
      occupation,
      income,
      past_surety_commitment,
      occupationtype,
      riot_victim,
      natural_calamity_victim,
      disabled_person,
      district_id,
      guarantor,
      ration_card_number,
      concent_for_aadhar_verification,
      resident,
      literate,
      past_surety_commitment_detail,
    } = personalDetails;
    // SQL query to insert data into personal_details table and return all columns
    // Execute the query with provided values

    let query = `
          INSERT INTO personal_details (
              district_id, 
              religion, 
              address, 
              name, 
              dob, 
              gender, 
              mobile, 
              email, 
              pan,
              current_address, 
              current_district, 
              current_taluka, 
              current_place,
              current_area, 
              current_pincode,
              permanent_address, 
              permanent_district, 
              permanent_taluka, 
              permanent_place,
              permanent_area, 
              permanent_pincode,
              marital_status, 
              education_qualification, 
              details, 
              guardian, 
              occupation, 
              income,
              past_surety_commitment, 
              aadhar, 
              occupationtype, 
              riot_victim, 
              natural_calamity_victim,
              disabled_person, 
              guarantor, 
              ration_card_number, 
              concent_for_aadhar_verification,
              resident,
              literate,
              past_surety_commitment_detail
          ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
              $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36,$37,$38,$39
          ) RETURNING *
      `;

    const values = [
      district_id,
      religion,
      address,
      name,
      dob,
      gender,
      mobile,
      email,
      pan,
      current_address,
      current_district,
      current_taluka,
      current_place,
      current_area,
      current_pincode,
      permanent_address,
      permanent_district,
      permanent_taluka,
      permanent_place,
      permanent_area,
      permanent_pincode,
      marital_status,
      education_qualification,
      details,
      guardian,
      occupation,
      income,
      past_surety_commitment,
      aadhar,
      occupationtype,
      riot_victim,
      natural_calamity_victim,
      disabled_person,
      guarantor,
      ration_card_number,
      concent_for_aadhar_verification,
      resident,
      literate,
      past_surety_commitment_detail,
    ];

    let result = await client.query(query, values);

    // Return the inserted row as personalDetails object
    const insertedPersonalDetails = result.rows[0];
    const application_id = insertedPersonalDetails.id;
    console.log("result insert personal details: ", result.rows[0]);
    query = `
    INSERT INTO public.user_applications(application_id, "user")
    VALUES ($1, $2)
    ON CONFLICT (application_id, "user")
    DO NOTHING;
`;
    result = await client.query(query, [application_id, user]);
    query = `
    INSERT INTO public.contacts(id,mobile_no_applicant)
    VALUES ($1, $2)
    ON CONFLICT (id)
    DO NOTHING;
`;
    result = await client.query(query, [application_id, user]);
    await client.query("COMMIT");
    return new Response(
      JSON.stringify({
        error: 0,
        errorMsg: "",
        // personalDetails: insertedPersonalDetails,
        personalDetails: insertedPersonalDetails,
      }),
      { status: 201 }
    );
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error inserting into personal_details:", error);
    return new Response(
      JSON.stringify({
        error: -1,
        errorMsg: "error inserting data",
      }),
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
// src/routes/api/personal-details/[id]/+server.js
const updatePersonalDetails = async (client, personalDetails) => {
  // Destructure the incoming details (only those that you want to update)
  const {
    id,
    religion,
    aadhar,
    name,
    dob,
    gender,
    address,
    mobile,
    email,
    pan,
    current_address,
    current_district,
    current_taluka,
    current_place,
    current_area,
    current_pincode,
    permanent_address,
    permanent_district,
    permanent_taluka,
    permanent_place,
    permanent_area,
    permanent_pincode,
    marital_status,
    education_qualification,
    details,
    guardian,
    occupation,
    income,
    past_surety_commitment,
    occupationtype,
    riot_victim,
    natural_calamity_victim,
    disabled_person,
    guarantor,
    ration_card_number,
    district_id,
    concent_for_aadhar_verification,
    resident,
    literate,
    past_surety_commitment_detail,
  } = personalDetails;

  // SQL query to update the row in the personal_details table based on the `id`
  let query = `
      UPDATE personal_details
      SET
        district_id = $1,
        religion = $2,
        address = $3,
        name = $4,
        dob = $5,
        gender = $6,
        mobile = $7,
        email = $8,
        pan = $9,
        current_address = $10,
        current_district = $11,
        current_taluka = $12,
        current_place = $13,
        current_pincode = $14,
        permanent_address = $15,
        permanent_district = $16,
        permanent_taluka = $17,
        permanent_place = $18,
        permanent_pincode = $19,
        marital_status = $20,
        education_qualification = $21,
        details = $22,
        guardian = $23,
        occupation = $24,
        income = $25,
        past_surety_commitment = $26,
        aadhar = $27,
        occupationtype = $28,
        riot_victim = $29,
        natural_calamity_victim = $30,
        disabled_person = $31,
        guarantor = $32,
        ration_card_number = $33,
        permanent_area = $34,
        current_area = $35,
        concent_for_aadhar_verification= $36,
         resident= $38,
      literate= $39,
      past_surety_commitment_detail=$40
      WHERE id = $37
      RETURNING *;
    `;

  const values = [
    district_id,
    religion,
    address,
    name,
    dob,
    gender,
    mobile,
    email,
    pan,
    current_address,
    current_district,
    current_taluka,
    current_place,
    current_pincode,
    permanent_address,
    permanent_district,
    permanent_taluka,
    permanent_place,
    permanent_pincode,
    marital_status,
    education_qualification,
    details,
    guardian,
    occupation,
    income,
    past_surety_commitment,
    aadhar,
    occupationtype,
    riot_victim,
    natural_calamity_victim,
    disabled_person,
    guarantor,
    ration_card_number,
    permanent_area,
    current_area,
    concent_for_aadhar_verification,
    id, // The last parameter is the unique `id` for the row to be updated
    resident,
    literate,
    past_surety_commitment_detail,
  ];

  // Execute the update query
  const result = await client.query(query, values);
  return result;
};
async function upsertBusinessDetails(client, businessDetails) {
  const query = `
    INSERT INTO public.business_details (
      id,
      business_name,
      business_details,
      business_address,
      business_district,
      business_taluka,
      business_place,
      business_pincode,
      quotation_name,
      quotation_gst_number,
      quotation_amount,
      loan_amount,
      bank_id,
      bank_name,
      ifsc_code,
      branch_name,
      account_number,
      bank_address,
      nic_code,
      business_type,
      org_type
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,$21
    )
    ON CONFLICT (id)
    DO UPDATE SET
      business_name = EXCLUDED.business_name,
      business_details = EXCLUDED.business_details,
      business_address = EXCLUDED.business_address,
      business_district = EXCLUDED.business_district,
      business_taluka = EXCLUDED.business_taluka,
      business_place = EXCLUDED.business_place,
      business_pincode = EXCLUDED.business_pincode,
      quotation_name = EXCLUDED.quotation_name,
      quotation_gst_number = EXCLUDED.quotation_gst_number,
      quotation_amount = EXCLUDED.quotation_amount,
      loan_amount = EXCLUDED.loan_amount,
      bank_id = EXCLUDED.bank_id,
      bank_name = EXCLUDED.bank_name,
      ifsc_code = EXCLUDED.ifsc_code,
      branch_name = EXCLUDED.branch_name,
      account_number = EXCLUDED.account_number,
      bank_address = EXCLUDED.bank_address,
      nic_code = EXCLUDED.nic_code,
      business_type = EXCLUDED.business_type,
      org_type = EXCLUDED.org_type
      RETURNING *;  -- This will return all columns of the updated or inserted row
  `;

  const values = [
    businessDetails.id,
    businessDetails.business_name,
    businessDetails.business_details,
    businessDetails.business_address,
    businessDetails.business_district,
    businessDetails.business_taluka,
    businessDetails.business_place,
    businessDetails.business_pincode,
    businessDetails.quotation_name,
    businessDetails.quotation_gst_number,
    businessDetails.quotation_amount,
    businessDetails.loan_amount,
    businessDetails.bank_id,
    businessDetails.bank_name,
    businessDetails.ifsc_code,
    businessDetails.branch_name,
    businessDetails.account_number,
    businessDetails.bank_address,
    businessDetails.nic_code,
    businessDetails.business_type,
    businessDetails.org_type,
  ];

  const res = await client.query(query, values);
  return res;
}
async function upsertGuarantorDetails(client, guarantorPersonalDetails) {
  const query = `
    INSERT INTO public.guarantor_personal_details (
      id,
      name,
      dob,
      gender,
      religion,
      aadhar,
      current_address,
      current_area,
      current_district,
      current_pincode,
      current_place,
      current_taluka,
      details,
      education_qualification,
      email,
      income,
      marital_status,
      mobile,
      occupation,
      occupation_type,
      pan,
      past_surety_commitment,
      past_surety_commitment_detail,
      permanent_address,
      permanent_area,
      permanent_district,
      permanent_pincode,
      permanent_place,
      permanent_taluka
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29
    )
    ON CONFLICT (id)
    DO UPDATE SET
      name = EXCLUDED.name,
      dob= EXCLUDED.dob,
      gender= EXCLUDED.gender,
      religion = EXCLUDED.religion,
      aadhar = EXCLUDED.aadhar,
      current_address = EXCLUDED.current_address,
      current_area= EXCLUDED.current_area,
      current_district = EXCLUDED.current_district,
      current_pincode = EXCLUDED.current_pincode,
      current_place = EXCLUDED.current_place ,
      current_taluka = EXCLUDED.current_taluka ,
      details = EXCLUDED.details ,
      education_qualification = EXCLUDED.education_qualification ,
      email = EXCLUDED.email,
      income = EXCLUDED.income,
      marital_status = EXCLUDED.marital_status,
      mobile = EXCLUDED.mobile,
      occupation = EXCLUDED.occupation ,
      occupation_type = EXCLUDED.occupation_type ,
      pan = EXCLUDED.pan,
      past_surety_commitment = EXCLUDED.past_surety_commitment ,
      past_surety_commitment_detail = EXCLUDED.past_surety_commitment_detail,
      permanent_address = EXCLUDED.permanent_address ,
      permanent_area = EXCLUDED.permanent_area ,
      permanent_district = EXCLUDED.permanent_district ,
      permanent_pincode = EXCLUDED.permanent_pincode ,
      permanent_place = EXCLUDED.permanent_place ,
      permanent_taluka = EXCLUDED.permanent_taluka 
      RETURNING *;  -- This will return all columns of the updated or inserted row
  `;

  const values = [
    guarantorPersonalDetails.id,

    guarantorPersonalDetails.name,
    guarantorPersonalDetails.dob,
    guarantorPersonalDetails.gender,
    guarantorPersonalDetails.religion,
    guarantorPersonalDetails.aadhar,

    guarantorPersonalDetails.current_address,
    guarantorPersonalDetails.current_area,
    guarantorPersonalDetails.current_district,
    guarantorPersonalDetails.current_pincode,
    guarantorPersonalDetails.current_place,
    guarantorPersonalDetails.current_taluka,
    guarantorPersonalDetails.details,
    guarantorPersonalDetails.education_qualification,
    guarantorPersonalDetails.email,
    guarantorPersonalDetails.income,
    guarantorPersonalDetails.marital_status,
    guarantorPersonalDetails.mobile,
    guarantorPersonalDetails.occupation,
    guarantorPersonalDetails.occupation_type,
    guarantorPersonalDetails.pan,
    guarantorPersonalDetails.past_surety_commitment,
    guarantorPersonalDetails.past_surety_commitment_detail,
    guarantorPersonalDetails.permanent_address,
    guarantorPersonalDetails.permanent_area,
    guarantorPersonalDetails.permanent_district,
    guarantorPersonalDetails.permanent_pincode,
    guarantorPersonalDetails.permanent_place,
    guarantorPersonalDetails.permanent_taluka,
  ];

  const res = await client.query(query, values);
  return res;
}

export async function PUT({ request, params }) {
  const client = await pool.connect();

  try {
    // Begin a transaction
    await client.query("BEGIN");

    // Extract the user from the params (URL parameter)
    const { user } = params;
    // Parse the incoming request body
    let { personalDetails, businessDetails, guarantorPersonalDetails } =
      await request.json();
    let result;
    let updatedPersonalDetails = {};
    let updatedBusinessDetails = {};
    let updatedGuarantorPersonalDetails = {};
    if (personalDetails) {
      result = await updatePersonalDetails(client, personalDetails);
      updatedPersonalDetails = result.rows[0];
    }
    if (businessDetails) {
      result = await upsertBusinessDetails(client, businessDetails);
      updatedBusinessDetails = { ...result.rows[0] };
    }
    if (guarantorPersonalDetails) {
      result = await upsertGuarantorDetails(client, guarantorPersonalDetails);
      updatedGuarantorPersonalDetails = { ...result.rows[0] };
    }
    // Commit the transaction
    await client.query("COMMIT");

    // If no rows were updated, return a 404 response
    if (result && result?.rowCount === 0) {
      return new Response(
        JSON.stringify({
          error: 1,
          errorMsg: "No personal details found with the provided id",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        error: 0,
        errorMsg: "",
        personalDetails: updatedPersonalDetails,
        businessDetails: updatedPersonalDetails,
        guarantorPersonalDetails: updatedGuarantorPersonalDetails,
      }),
      { status: 200 }
    );
  } catch (error) {
    // Rollback the transaction in case of an error
    await client.query("ROLLBACK");
    console.error(
      "Error updating personal_details:",
      error.message,
      error.stack
    );
    return new Response(
      JSON.stringify({
        error: -1,
        errorMsg: "Error updating application form details",
      }),
      { status: 500 }
    );
  } finally {
    client.release(); // Release the database client after the transaction
  }
}

// export async function PUT({ request, params }) {
//   try {
//     const { user } = params;
//     const {
//       personalDetails,
//       businessDetails,
//       guarantorPersonalDetails,
//       properties,
//       licPolicies,
//       fds,
//       uploadedDocs,
//     } = await request.json();
//     if (personalDetails) {

//     }
//     return new Response(
//       JSON.stringify({
//         error: 0,
//         errorMsg: "",
//         params,
//         method: "PUT",
//         personalDetails,
//       }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error in applications/[user] post endpoint:", error);
//     return new Response(
//       JSON.stringify({ error: -1, errorMsg: "An error occurred" }),
//       { status: 500 }
//     );
//   }
// }
const getPersonalDetails = async (client, id) => {
  let query = `SELECT 
              id, 
              district_id, 
              religion, 
              address, 
              name, 
              dob, 
              gender, 
              mobile, 
              email, 
              pan,
              current_address, 
              current_district, 
              current_taluka, 
              current_place,
              current_area, 
              current_pincode,
              permanent_address, 
              permanent_district, 
              permanent_taluka, 
              permanent_place,
              permanent_area, 
              permanent_pincode,
              marital_status, 
              education_qualification, 
              details, 
              guardian, 
              occupation, 
              income,
              past_surety_commitment, 
              aadhar, occupationtype, 
              riot_victim, 
              natural_calamity_victim,
              disabled_person, 
              guarantor, 
              ration_card_number, 
              concent_for_aadhar_verification, 
              literate, 
              resident,
              application_status,
              form_no,
              past_surety_commitment_detail,
              verification_status
            FROM personal_details
            WHERE id = $1
      `;

  let result = await client.query(query, [id]);
  // Return the inserted row as personalDetails object
  if (result.rows && result.rows.length) {
    return result.rows[0];
  }
  return {};
};

const getBusinessDetails = async (client, id) => {
  let query = `SELECT 
                id, business_name, business_details, business_address, business_district, business_taluka, business_place, 
                business_pincode, quotation_name, quotation_gst_number, quotation_amount, loan_amount, bank_id, ifsc_code, bank_name, branch_name, 
                account_number, bank_address, nic_code, business_type, org_type
	            FROM business_details
              WHERE id = $1
      `;
  let result = await client.query(query, [id]);
  // Return the inserted row as personalDetails object
  if (result.rows && result.rows.length) {
    return result.rows[0];
  }
  return {};
};

const getGuarantorDetails = async (client, id) => {
  let query = `SELECT 
                id, name, dob, gender, religion, aadhar, mobile, email, pan, current_address, current_district, current_taluka, 
                current_place,current_area, current_pincode, permanent_address, permanent_district, permanent_taluka, permanent_place,permanent_area, permanent_pincode, 
                marital_status, education_qualification, details, guardian, occupation, occupation_type, income, past_surety_commitment, 
                riot_victim, natural_calamity_victim, disable_person, updated_at, past_surety_commitment_detail
            	FROM public.guarantor_personal_details
              WHERE id = $1
              `;

  let result = await client.query(query, [id]);

  // Return the inserted row as personalDetails object
  if (result.rows && result.rows.length) {
    return result.rows[0];
  }
  return {};
};

const getProperties = async (client, id) => {
  const query = `SELECT id, application_id, property_type, description, survey_no, unit_no, street_address, dist_id, taluka_id, place, pincode, property_value 
                 FROM  property_information 
                 WHERE application_id = $1 ORDER BY id `;

  let result = await client.query(query, [id]);

  return result.rows;
};

const getLICPolicies = async (client, id) => {
  let query = `SELECT id, application_id, policy_name, policy_type, policy_receipt_no, surrender_value, start_date, maturity_date
              FROM lic_policies
              WHERE application_id = $1 `;

  let result = await client.query(query, [id]);

  // Return the inserted row as personalDetails object
  return result.rows;
};

const getFDs = async (client, id) => {
  let query = `SELECT id, application_id, bank_name, branch_name, street_address, dist_id, taluka_id, place, pincode, fd_acc_no, start_date, maturity_date, amount, owner_type
	             FROM public.fds
               WHERE application_id = $1
              `;

  let result = await client.query(query, [id]);

  // Return the inserted row as personalDetails object
  return result.rows;
};

const getUploadedDocs = async (client, id) => {
  let query = `SELECT seq_no, application_id, document_id, document_name, document_size, upload_date, 
                file_name, owner_type, org_filename, status, created_at, updated_at
	            FROM upload_docs
              WHERE application_id= $1 
              AND status=1
              `;

  let result = await client.query(query, [id]);

  // Return the inserted row as personalDetails object
  return result.rows;
};

const getContact = async (client, id) => {
  let query = `SELECT 
                  id, mobile_no_applicant, email_id_applicant, mobile_no_gurrantor, email_id_gurrantor
	            FROM public.contacts
              WHERE id= $1 
              `;

  let result = await client.query(query, [id]);

  // Return the inserted row as personalDetails object
  return result.rows;
};

export async function GET({ request, params }) {
  const { user } = params;
  const client = await pool.connect();
  try {
    let query = `SELECT 
    application_id, "user"
    FROM user_applications
    WHERE "user" = $1
    `;

    let result = await client.query(query, [user]);
    const userApplications = result.rows;

    const promises = userApplications.map(async (e) => {
      const personalDetails = await getPersonalDetails(
        client,
        e.application_id
      );
      const businessDetails = await getBusinessDetails(
        client,
        e.application_id
      );
      const guarantorPersonalDetails = await getGuarantorDetails(
        client,
        e.application_id
      );
      const properties = await getProperties(client, e.application_id);
      const licPolicies = await getLICPolicies(client, e.application_id);
      const fds = await getFDs(client, e.application_id);
      const uploadedDocs = await getUploadedDocs(client, e.application_id);
      const contacts = await getContact(client, e.application_id);

      return {
        personalDetails,
        businessDetails,
        guarantorPersonalDetails,
        properties,
        licPolicies,
        fds,
        uploadedDocs,
        contacts,
      };
    });
    const applications = await Promise.all(promises);
    return new Response(
      JSON.stringify({
        error: 0,
        errorMsg: "",
        applications,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(`Error in applications/${user} get endpoint:`, error);
    return new Response(
      JSON.stringify({ error: -1, errorMsg: "An error occurred" }),
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

import pool from "$lib/db"; // Adjust the path according to your structure
import { json } from "@sveltejs/kit";

export async function GET({ params }) {
  const client = await pool.connect();
  try {
    const { applicationId, user } = params;

    const query = `SELECT id,
        application_id,
        property_type,
        description,
        survey_no,
        unit_no,
        street_address,
        dist_id,
        taluka_id,
        place,
        pincode,
        property_value,
        sub_property
       FROM property_information 
       WHERE  application_id = $1
       ORDER BY id
    `;

    const values = [applicationId];
    const result = await client.query(query, values);
    const properties = result.rows;
    // Return success response
    return json({ error: 0, errorMsg: "", properties }, { status: 200 });
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
    const { property, user, userId } = await request.json();
    // console.log("applicationId: ", applicationId);
    // console.log("property: ", property);
    // console.log("user: ", user);

    if (!applicationId) {
      console.log("missing applicationId");
      return json(
        { error: "Missing applicationId required fields" },
        { status: 400 }
      );
    }
    if (!property) {
      console.log("missing property");
      return json(
        { error: "Missing property in required fields" },
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

    const {
      id,
      property_type,
      description,
      unit_no,
      survey_no,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      property_value,
      sub_property
    } = property;

    // console.log("applicationId: ", applicationId);
    // console.log("property: ", property);
    // console.log("user: ", user);
    // console.log("userId: ", userId);

    if (
      !property_type ||
      !survey_no ||
      !unit_no ||
      !street_address ||
      !dist_id ||
      !taluka_id ||
      !place ||
      !pincode ||
      !property_value ||
      !sub_property
    ) {
      console.log("missing some fields in property: ", property);
      return json(
        { error: "Missing required fields in property" },
        { status: 400 }
      );
    }
    const query = `UPDATE property_information 
        set property_type = $1,
        description = $2,
        survey_no = $3,
        unit_no = $4,
        street_address = $5,
        dist_id = $6,
        taluka_id = $7,
        place = $8,
        pincode = $9,
        property_value  = $10,
        sub_property = $11
       WHERE application_id = $12 AND id = $13
      RETURNING id;
    `;

    const values = [
      property_type,
      description || "", // allow description to be optional
      survey_no,
      unit_no,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      property_value,
      sub_property,
      applicationId,
      id,
    ];
    const result = await client.query(query, values);
    const newPropertyId = result.rows[0].id;

    // Return success response
    return json({ error: 0, errorMsg: "", id: newPropertyId }, { status: 201 });
  } catch (error) {
    console.error("Error inserting data:", error);
    return json({ error: "Database error" }, { status: 500 });
  } finally {
    client.release();
  }
}

import pool from "$lib/db"; // Adjust the path according to your structure
import { json } from "@sveltejs/kit";
export async function POST({ request, params }) {
  const client = await pool.connect();
  try {
    console.log("post request called to add property ##1");
    const { application_id, property, user, userId } = await request.json();
    console.log("application_id: ", application_id);
    console.log("property: ", property);
    console.log("user: ", user);

    if (!application_id) {
      return json(
        { error: "Missing application_id required fields" },
        { status: 400 }
      );
    }
    if (!property) {
      return json(
        { error: "Missing property in required fields" },
        { status: 400 }
      );
    }
    if (!user) {
      return json(
        { error: "Missing user in required fields" },
        { status: 400 }
      );
    }

    // if (!userId) {
    //   return json(
    //     { error: "Missing userId in required fields" },
    //     { status: 400 }
    //   );
    // }

    const {
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
      sub_property,
    } = property;

    console.log("application_id: ", application_id);
    console.log("property: ", property);
    console.log("user: ", user);
    // console.log("userId: ", userId);

    console.log("post request called to add property : ##2 ");
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
      return json(
        { error: "Missing required fields in property" },
        { status: 400 }
      );
    }
    console.log("post request called to add property : ##3 ");
    const query = `
      INSERT INTO property_information (
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id;
    `;

    const values = [
      application_id,
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
    ];
    console.log("post request called to add property : ##4 ");
    const result = await client.query(query, values);
    const newPropertyId = result.rows[0].id;

    console.log("post request called to add property : ##5 ");
    // Return success response
    return json({ error: 0, errorMsg: "", id: newPropertyId }, { status: 201 });
  } catch (error) {
    console.error("Error inserting data:", error);
    return json({ error: "Database error" }, { status: 500 });
  } finally {
    client.release();
  }
}

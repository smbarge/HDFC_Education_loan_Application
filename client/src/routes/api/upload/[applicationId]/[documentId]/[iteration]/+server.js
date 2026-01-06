// @ts-nocheck
// src/routes/upload/+server.js
import pool from "$lib/db"; // Adjust the path according to your structure
import { promises as fs } from "fs";
import path from "path";
import { json } from "@sveltejs/kit";
// Body parser settings
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set your desired limit here
    },
  },
};
function generateShortGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .slice(0, 8); // Shorten to 8 characters
}
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const validateFileSize = (fileSize) => {
  if (fileSize > MAX_FILE_SIZE) {
    console.error("Error: File size exceeds 5MB limit.");
    return false;
  }
  return true;
};
export const POST = async ({ request, params }) => {
  try {
    const { applicationId, documentId, iteration } = params;
    console.log(
      "applicationId is: ",
      applicationId,
      "documentId is: ",
      documentId,
      "iteration is: ",
      iteration
    );
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    // Get file details
    let { name, type, size } = file;
    console.log('validateFileSize',validateFileSize(size));
    
    if (!validateFileSize(size)) {
      console.log("File is within the allowed size limit.");
      return new Response(
       JSON.stringify({
        message: "File size must be 5MB or less",
        fileName: name,
        fileType: type,
        fileSize: size,
      }),
      { status: 400 }
    )
    } 
    console.log("pdf size is ", size);
    const extname = path.extname(name).slice(1);
    let newFileName = `${applicationId}-${documentId}-${generateShortGUID()}.${extname}`;
    console.log("filename: ", name);
    // Convert file data to buffer
    const filePath = path.join(process.cwd(), "uploads", newFileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("filePath is: ", filePath);

    await fs.writeFile(filePath, buffer);
    let query = `SELECT eng_name, upload_for FROM public.m_upload_documents  where id = $1`;
    let values = [documentId];
    let result = await pool.query(query, values);

    const documentName = result.rows[0].eng_name;
    const ownerType = result.rows[0].upload_for; // Replace if there's an owner type todo
    const documentSize = size; // Size of the file
    const status = 1; // is inserted and valid
    const originalFilename = name; // Origin

    query = `INSERT INTO upload_docs (
      application_id, 
      document_id, 
      document_name, 
      document_size, 
      file_name, 
      owner_type, 
      org_filename, 
      status, 
      iteration, 
      created_at, 
      updated_at
    ) VALUES (
      $1, 
      $2, 
      $3, 
      $4, 
      $5, 
      $6, 
      $7, 
      $8, 
      $9, 
      CURRENT_TIMESTAMP, 
      CURRENT_TIMESTAMP)
    RETURNING seq_no;
  `;

    values = [
      applicationId,
      documentId, // Actual document_id logic
      documentName, // document_name (the name of the file)
      documentSize, // document_size (file size in bytes)
      newFileName, // file_name (name of the file stored on disk)
      ownerType, // owner_type (can be null)
      originalFilename, // org_filename (original filename as uploaded by user)
      status, // status (integer representing the status)
      Number(iteration),
    ];
    result = await pool.query(query, values);

    //   query = `
    //  update verification set iteration =$1
    //   where application_id =$2 and status =13
    //  `;
    //   values = [iteration, applicationId];
    //   result = await pool.query(query, values);

    return new Response(
      JSON.stringify({
        message: "File uploaded successfully",
        fileName: name,
        fileType: type,
        fileSize: size,
      }),
      { status: 200 }
    );
  } catch (e) {
    console.error("error in uploading file: ", e);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
  }
};
export const GET = async ({ params }) => {
  const { applicationId, documentId, iteration } = params;

  try {
    // Query the database to get the file name based on applicationId, documentId, and status = 1
    const query = `
      SELECT file_name, org_filename
      FROM upload_docs 
      WHERE application_id = $1 
        AND document_id = $2 
        AND status = 1 
        AND iteration = $3

      ORDER BY seq_no DESC 
      LIMIT 1;
    `;
    const values = [applicationId, documentId, iteration];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return new Response("File not found or no active uploads", {
        status: 404,
      });
    }

    // Get the file name from the result
    const fileName = result.rows[0].file_name;
    const orgFilename = result.rows[0].org_filename;

    // Define the path to the file in the uploads directory
    const filePath = path.join(process.cwd(), "uploads", fileName);

    // Check if the file exists
    console.log("file path is", filePath);

    try {
      await fs.access(filePath);
    } catch (err) {
      console.log("error is", err);

      return new Response("File not found on the server", { status: 404 });
    }

    // Read the file from the disk
    const fileBuffer = await fs.readFile(filePath);

    // Set the appropriate content type for the file
    const ext = path.extname(fileName).slice(1).toLowerCase();
    let contentType = "application/octet-stream"; // Default binary stream

    // Handle different file types (Add more types as needed)
    switch (ext) {
      case "jpg":
      case "jpeg":
        contentType = "image/jpeg";
        break;
      case "png":
        contentType = "image/png";
        break;
      case "pdf":
        contentType = "application/pdf";
        break;
      case "txt":
        contentType = "text/plain";
        break;
    }

    // Return the file to the user
    return new Response(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${orgFilename}"`,
      },
    });
  } catch (err) {
    console.error("Error fetching file: ", err);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
  }
};

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function DELETE({ params }) {
  const { applicationId, documentId, iteration } = params;

  try {
    // Attempt to update the status directly
    const result = await pool.query(
      `UPDATE upload_docs SET status = 2 WHERE application_id = $1 AND document_id = $2 AND status = 1 AND iteration =$3`,
      [applicationId, documentId, iteration]
    );

    console.log("iteration", iteration);

    if (result.rowCount === 0) {
      return json(
        { error: "No document found or status is not 1" },
        { status: 404 }
      );
    }

    // return json({ message: "Status updated to 2 successfully" });
    return json({ message: "File successfully deleted" });
  } catch (error) {
    console.error("Error updating status:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
  }
}
